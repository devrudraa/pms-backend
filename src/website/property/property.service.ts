import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PropertyEntity,
  PropertyStatus,
} from 'src/modules/property/property.entity';
import { Repository } from 'typeorm';
import {
  PaginatedPropertiesResponseDto,
  PaginatedPropertyResponseDto,
} from './dto/paginated-property-res.dto';
import { Unit } from 'src/modules/unit/unit.entity';
import { PropertiesFilterDto } from './dto/property-filter.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyEntity: Repository<PropertyEntity>,
    @InjectRepository(Unit)
    private readonly unitEntity: Repository<Unit>,
  ) {}

  async getPropertyById(id: string) {
    return await this.propertyEntity
      .createQueryBuilder('property')
      .leftJoin('property.owner', 'owner')
      .addSelect([
        'owner.firstName',
        'owner.lastName',
        'owner.id',
        'owner.image',
      ])
      .leftJoinAndSelect('property.units', 'unit', 'unit.tenant IS NULL')
      .where('property.id = :id', { id: id })
      .andWhere('property.status = :status', { status: PropertyStatus.LISTED })
      .getOneOrFail();
  }

  async getPaginated(
    filter: PropertiesFilterDto,
  ): Promise<PaginatedPropertiesResponseDto> {
    const {
      page = 1,
      limit = 10,
      search,
      suburb,
      town,
      region,
      bedrooms,
      bathrooms,
      petFriendly,
      parkingSpace,
      furnished,
      maxPrice,
      minPrice,
      maxSize,
      minSize,
    } = filter;

    const query = this.propertyEntity
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.units', 'unit', 'unit.tenant IS NULL')
      .where('property.status = :status', { status: PropertyStatus.LISTED });

    if (search)
      query.andWhere('property.title ILIKE :search', { search: `%${search}%` });

    if (suburb)
      query.andWhere('property.suburb ILIKE :suburb', {
        suburb: `%${suburb}%`,
      });

    if (town)
      query.andWhere('property.town ILIKE :town', { town: `%${town}%` });

    if (region)
      query.andWhere('property.region ILIKE :region', {
        region: `%${region}%`,
      });

    if (minSize !== undefined)
      query.andWhere('unit.sizeSqFt >= :minSize', {
        minSize,
      });

    if (maxSize !== undefined)
      query.andWhere('unit.sizeSqFt <= :maxSize', {
        maxSize,
      });

    if (bedrooms !== undefined)
      query.andWhere('unit.bedrooms = :bedrooms', { bedrooms });

    if (bathrooms !== undefined)
      query.andWhere('unit.bathrooms = :bathrooms', { bathrooms });

    if (petFriendly !== undefined)
      query.andWhere('unit.petFriendly = :petFriendly', { petFriendly });

    if (parkingSpace !== undefined)
      query.andWhere('unit.parkingSpace = :parkingSpace', { parkingSpace });

    if (furnished !== undefined)
      query.andWhere('unit.furnished = :furnished', { furnished });

    if (minPrice !== undefined)
      query.andWhere('unit.pricing.rentAmount >= :minPrice', {
        minPrice,
      });

    if (maxPrice !== undefined)
      query.andWhere('unit.pricing.rentAmount <= :maxPrice', {
        maxPrice,
      });

    const skip = (page - 1) * limit;
    const [properties, total] = await query
      .orderBy('property.createdAt', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const data: PaginatedPropertyResponseDto[] = properties.map((property) => {
      const firstAvailableUnit = property.units ? property.units[0] : null;
      return {
        id: property.id,
        title: property.title,
        address: property.address || '',
        listingType: property.listingType,
        images: property.images,
        unit: firstAvailableUnit
          ? {
              bedrooms: firstAvailableUnit.bedrooms,
              bathrooms: firstAvailableUnit.bathrooms,
              petFriendly: firstAvailableUnit.petFriendly,
              furnished: firstAvailableUnit.furnished,
              parkingSpace: firstAvailableUnit.parkingSpace,
              price: firstAvailableUnit.pricing?.rentAmount ?? 0,
              sizeSqFt: firstAvailableUnit.sizeSqFt,
            }
          : null,
      };
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data: data,
      totalPages,
      page,
      limit,
      isNext: page > 1,
      isPrev: skip + properties.length < total,
    };
  }
}
