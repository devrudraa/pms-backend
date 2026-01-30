import { ApiProperty } from '@nestjs/swagger';
import { PaginatedPropertiesResponseDto } from './paginated-property-res.dto';

export class ManagerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ nullable: true })
  image: string | null;
}

export class PaginatedPropertiesWithManagerResponseDto extends PaginatedPropertiesResponseDto {
  @ApiProperty({ type: ManagerDto })
  manager: ManagerDto;
}
