import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ListingType } from '../property.entity';

export class CreatePropertyDTO {
  @ApiProperty({
    description: 'Human-readable title of the property',
    example: 'Luxury Apartment Downtown',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @ApiProperty({
    description: 'Listing type of the property',
    enum: ListingType,
    example: ListingType.RENT,
  })
  @IsEnum(ListingType)
  listingType: ListingType;
}
