import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePropertyDTO } from './dto/property-create.dto';
import { UpdatePropertyDTO } from './dto/property-update.dto';
import { PropertyEntity } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
    private readonly userService: UsersService,
  ) {}

  async updateProperty(
    currentUser: JwtPayload,
    existingProperty: PropertyEntity,
    dto: UpdatePropertyDTO,
  ) {
    // const propertyManager = await this.userService.findByIdOrUndefined(
    //   dto.managerId,
    // );

    if (currentUser.userId != existingProperty.owner.id) {
      // TODO: Return an error
      return;
    }

    /**
     * 3. Update property entity
     */
    const updateData: Partial<PropertyEntity> = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.address !== undefined) updateData.address = dto.address;
    if (dto.region !== undefined) updateData.region = dto.region;
    if (dto.town !== undefined) updateData.town = dto.town;
    if (dto.suburb !== undefined) updateData.suburb = dto.suburb;
    if (dto.propertyType !== undefined)
      updateData.propertyType = dto.propertyType;

    return await this.propertyRepository.update(existingProperty.id, {
      ...updateData,
      manager: dto.managerId ? { id: dto.managerId } : null,
    });
  }

  async createProperty(dto: CreatePropertyDTO, currentUser: JwtPayload) {
    // const currentUserData = await this.userService.findByEmail(
    //   currentUser.email,
    // );

    // if (!currentUserData) return;

    /**
     * Role-based listing type enforcement
     */
    // if (role === 'AGENT' && dto.listingType !== ListingType.SELL) {
    //   throw new ForbiddenException('Agents can only create SELL listings');
    // }

    // if (role === 'LANDLORD' && dto.listingType !== ListingType.RENT) {
    //   throw new ForbiddenException('Landlords can only create RENT listings');
    // }

    /**
     * Create and persist property
     */
    const property = this.propertyRepository.create({
      name: dto.name,
      listingType: dto.listingType,
      owner: { id: currentUser.userId },
    });

    return this.propertyRepository.save(property);
  }

  // BASIC CRUD OPERATIONS
  async getPropertyById(id: string) {
    return this.propertyRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['owner', 'manager'],
    });
  }

  async getAllProperties() {
    return this.propertyRepository.find();
  }
}
