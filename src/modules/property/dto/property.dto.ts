import { ApiProperty } from '@nestjs/swagger';

export class GetPropertyByIdResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the property',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the property',
    example: 'Luxury Apartment Downtown',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the property',
    example: '123 Main Street, New York, NY 10001',
  })
  address: string;

  @ApiProperty({
    description: 'The city where the property is located',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'The state of the property',
    example: 'NY',
  })
  state: string;

  @ApiProperty({
    description: 'The postal code of the property',
    example: '10001',
  })
  postalCode: string;

  @ApiProperty({
    description: 'The property type',
    example: 'Apartment',
    enum: ['Apartment', 'House', 'Commercial', 'Land'],
  })
  type: string;

  @ApiProperty({
    description: 'The price of the property',
    example: 500000,
  })
  price: number;

  @ApiProperty({
    description: 'The date when the property was created',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the property was last updated',
    example: '2024-01-20T14:45:00Z',
  })
  updatedAt: Date;
}
