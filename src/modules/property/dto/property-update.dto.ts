import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePropertyDTO {
  // PROPERTY DETAILS
  @ApiProperty({
    description: 'Human-readable title of the property',
    example: 'Luxury Apartment Downtown',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title?: string;

  // @ApiProperty({
  //   description: 'Defines whether the property is listed for sale or rent',
  //   enum: ListingType,
  //   example: ListingType.RENT,
  // })
  // @IsEnum(ListingType)
  // listingType: ListingType;

  @ApiProperty({
    description:
      'Detailed description of the property, including features and highlights',
    example:
      'A fully furnished 3BHK apartment with parking, gym, and power backup.',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @ApiProperty({
    description: 'Full street address of the property',
    example: '123 MG Road, Near Metro Station',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  address?: string;

  @ApiProperty({
    description: 'Administrative region or state where the property is located',
    example: 'Karnataka',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  region?: string;

  @ApiProperty({
    description: 'Town or city in which the property is located',
    example: 'Bangalore',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  town?: string;

  @ApiProperty({
    description: 'Local suburb or area name of the property',
    example: 'Indiranagar',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  suburb?: string;

  @ApiProperty({
    description: 'House, Apartment, Room, etc.',
    example: 'Flat',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  propertyType?: string;

  // OWNERSHIP & CONTROL
  //! BY DEFAULT WE WILL SELECT THE LOGGED IN USER AS OWNER
  //   @ApiProperty({
  //     description: 'UUID of the property owner (User ID)',
  //     example: '550e8400-e29b-41d4-a716-446655440000',
  //     format: 'uuid',
  //   })
  //   @IsUUID()
  //   owner: string;

  @ApiProperty({
    description:
      'UUID of the property manager (User ID). Null if the owner manages the property directly.',
    example: '9b2e0f3a-9a4e-4b77-8c31-2e5f8b41d991',
    format: 'uuid',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  managerId?: string;

  // PROPERTY UNITS
  // @ApiProperty({
  //   description:
  //     'Array of UUIDs referencing units associated with this property (e.g., flats, shops, rooms)',
  //   example: [
  //     '111e8400-e29b-41d4-a716-446655440001',
  //     '222e8400-e29b-41d4-a716-446655440002',
  //   ],
  //   type: [String],
  //   format: 'uuid',
  // })
  // @IsArray()
  // @IsUUID('4', { each: true })
  // unitIds: string[];
}
