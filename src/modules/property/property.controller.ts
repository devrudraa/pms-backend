import { Controller, Get } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetPropertyByIdResponseDto } from './dto/property.dto';
import { PropertyService } from './property.service';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({ name: 'id', description: 'The property ID', type: String })
  @ApiOkResponse({
    description: 'Property retrieved successfully',
    type: GetPropertyByIdResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Property not found' })
  async getPropertyById(id: string) {
    return await this.propertyService.findPropertyById(id);
  }
}
