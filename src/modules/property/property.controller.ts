import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import type { JwtPayload } from 'src/jwt/jwt.strategy';
import { UpdatePropertyDTO } from './dto/property-update.dto';
import { GetPropertyByIdResponseDto } from './dto/property.dto';
import { PropertyService } from './property.service';
import { PropertyEntity } from './property.entity';
import { CreatePropertyDTO } from './dto/property-create.dto';

@ApiTags('Property')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAllProperty() {
    return await this.propertyService.getAllProperties();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({ name: 'id', description: 'The property ID', type: String })
  @ApiOkResponse({
    description: 'Property retrieved successfully',
    type: GetPropertyByIdResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Property not found' })
  async getPropertyById(@Param('id', ParseUUIDPipe) id: string) {
    console.log('this id: ', id);

    return await this.propertyService.getPropertyById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a property' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the property to update',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdatePropertyDTO,
    description: 'Payload to update an existing property',
  })
  @ApiOkResponse({
    description: 'Property updated successfully',
    type: GetPropertyByIdResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Property not found' })
  async updateProperty(
    @Param('id', ParseUUIDPipe) propertyId: string,
    @Body() dto: UpdatePropertyDTO,
    @CurrentUser() user: JwtPayload,
  ) {
    let currentProperty: PropertyEntity | null = null;
    try {
      currentProperty = await this.propertyService.getPropertyById(propertyId);
    } catch (error) {
      // todo throw app error here
      throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }

    try {
      await this.propertyService.updateProperty(user, currentProperty, dto);
    } catch (error) {
      // todo throw app error here
      throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new property (minimal)' })
  @ApiBody({
    type: CreatePropertyDTO,
    description: 'Minimal payload to create a property',
  })
  @ApiOkResponse({
    description: 'Property created successfully',
    type: GetPropertyByIdResponseDto,
  })
  async createProperty(
    @Body() dto: CreatePropertyDTO,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.propertyService.createProperty(dto, user);
  }
}
