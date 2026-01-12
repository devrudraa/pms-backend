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
    const property = this.propertyRepository.update(
      {
        id: existingProperty.id,
      },
      {
        name: dto.name,
        description: dto.description,
        address: dto.address,
        region: dto.region,
        town: dto.town,
        suburb: dto.suburb,
        propertyType: dto.propertyType,
        manager: dto.managerId ? { id: dto.managerId } : null,
      },
    );

    return property;
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
