import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PropertiesFilterDto } from './dto/property-filter.dto';
import { PaginatedPropertiesResponseDto } from './dto/property-res.dto';
import { PropertyService } from './property.service';

@ApiTags('Website Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Get properties with filters and pagination' })
  @ApiOkResponse({
    description: 'Properties fetched successfully',
    type: PaginatedPropertiesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    schema: {
      example: {
        statusCode: 400,
        message: ['page must be a number', 'limit must be a number'],
        error: 'Bad Request',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async getProperties(@Query() filter: PropertiesFilterDto) {
    return await this.propertyService.getPaginated(filter);
  }
}
