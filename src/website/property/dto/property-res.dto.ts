import { ApiProperty } from '@nestjs/swagger';

/* =========================
   Owner DTO
========================= */
export class PropertyManagerDto {
  @ApiProperty({ example: '042f61bf-d7c6-45e3-9ee0-d6e3804adc8c' })
  id: string;

  @ApiProperty({ example: 'Landlord1' })
  firstName: string;

  @ApiProperty({ example: 'User1' })
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ example: null, nullable: true })
  image: string | null;
}

/* =========================
   Unit Pricing DTO
========================= */
export class UnitPricingDto {
  @ApiProperty({ example: '2526' })
  rentAmount: string;

  @ApiProperty({ example: '5052' })
  securityDeposit: string;

  @ApiProperty({ example: false })
  utilitiesIncluded: boolean;

  @ApiProperty({
    example: 'Electricity and water not included',
    nullable: true,
  })
  utilitiesBreakdown: string | null;

  @ApiProperty({ example: 'N$' })
  currency: string;
}

/* =========================
   Unit DTO
========================= */
export class UnitDto {
  @ApiProperty({ example: 'bc64590b-aaa4-4e81-bb46-436fdd56e35b' })
  id: string;

  @ApiProperty({ example: 'House 1' })
  unitName: string;

  @ApiProperty({ example: 2277 })
  sizeSqFt: number;

  @ApiProperty({ example: 2 })
  bedrooms: number;

  @ApiProperty({ example: 3 })
  bathrooms: number;

  @ApiProperty({ example: true })
  petFriendly: boolean;

  @ApiProperty({ example: true })
  parkingSpace: boolean;

  @ApiProperty({ example: false })
  furnished: boolean;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ type: UnitPricingDto })
  pricing: UnitPricingDto;
}

/* =========================
   Property Response DTO
========================= */
export class PropertyResponseDto {
  @ApiProperty({ example: '27dab1a4-f90a-49ad-bf28-137a9e040af2' })
  id: string;

  @ApiProperty({ example: 'Beautiful House in Springfield' })
  title: string;

  @ApiProperty({ example: 'RENT' })
  listingType: string;

  @ApiProperty({ type: PropertyManagerDto })
  manager: PropertyManagerDto;

  @ApiProperty({ example: 'LISTED' })
  status: string;

  @ApiProperty({
    type: [String],
    example: [
      'https://staging.digitalpropertyhub.com.na/images/card/card_placeholder.png',
    ],
  })
  images: string[];

  @ApiProperty({ example: 'House' })
  propertyType: string;

  @ApiProperty({
    example:
      'This is a lovely house with modern amenities and great location. Perfect for families or professionals.',
  })
  description: string;

  @ApiProperty({ example: '20 Main Street' })
  address: string;

  @ApiProperty({ example: 'North' })
  region: string;

  @ApiProperty({ example: 'Springfield' })
  town: string;

  @ApiProperty({ example: 'Downtown' })
  suburb: string;

  @ApiProperty({ type: [UnitDto] })
  units: UnitDto[];

  @ApiProperty({ example: '2026-01-18T14:22:27.717Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-01-18T14:22:27.717Z' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: string | null;
}
