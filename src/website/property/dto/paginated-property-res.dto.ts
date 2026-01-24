import { ApiProperty } from '@nestjs/swagger';
import { ListingType } from 'src/modules/property/property.entity';

export class PaginatedPropertyUnitDto {
  @ApiProperty({ example: 2 })
  bedrooms: number;

  @ApiProperty({ example: 1 })
  bathrooms: number;

  @ApiProperty({ example: true })
  petFriendly: boolean;

  @ApiProperty({ example: true })
  furnished: boolean;

  @ApiProperty({ example: true, type: 'boolean' })
  parkingSpace: boolean;

  @ApiProperty({ example: '10000', type: 'number' })
  price: number;

  @ApiProperty({ example: '10000', type: 'number' })
  sizeSqFt: number;
}

export class PaginatedPropertyResponseDto {
  @ApiProperty({ example: 'UUID' })
  id: string;

  @ApiProperty({ example: 'Modern Apartment in Bondi' })
  title: string;

  @ApiProperty({ example: '123 Street' })
  address: string;

  @ApiProperty({ example: 'rent', enum: ListingType })
  listingType: string;

  @ApiProperty({
    example:
      '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]',
    type: 'string',
    isArray: true,
  })
  images: string[];

  @ApiProperty({ type: PaginatedPropertyUnitDto })
  unit: PaginatedPropertyUnitDto | null;
}

export class PaginatedPropertiesResponseDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 125 })
  totalPages: number;

  @ApiProperty({ example: true })
  isNext: boolean;

  @ApiProperty({ example: false })
  isPrev: boolean;

  @ApiProperty({ type: [PaginatedPropertyResponseDto] })
  data: PaginatedPropertyResponseDto[];
}
