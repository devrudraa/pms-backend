import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/users/user.entity';

export class UserResponseDto {
  @ApiProperty({
    example: 'c3b8f5f4-6c7d-4a5e-9c2e-1f3a5d6e7b8c',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    example: '1990-05-15T00:00:00.000Z',
    nullable: true,
  })
  dob: string | null;

  @ApiProperty({
    example: '+1-555-123-4567',
  })
  phoneNumber: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.TENANT,
  })
  role: UserRole;

  @ApiProperty({
    example: true,
  })
  isVerified: boolean;

  @ApiProperty({
    example: '2025-01-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-01-05T12:30:00.000Z',
  })
  updatedAt: Date;
}
