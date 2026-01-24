import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PropertiesFilterDto } from './dto/property-filter.dto';
import { PaginatedPropertiesResponseDto } from './dto/paginated-property-res.dto';
import { PropertyService } from './property.service';
import { PropertyResponseDto } from './dto/property-res.dto';

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

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique property identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Property retrieved successfully',
    type: PropertyResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  async getPropertyById(@Param('id') id: string) {
    return await this.propertyService.getPropertyById(id);
  }
}
