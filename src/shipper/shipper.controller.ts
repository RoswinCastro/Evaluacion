import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShipperService } from './shipper.service'; 
import { CreateShipperDto } from './dto/create-shipper.dto'; 
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';

@Controller('shiper')
export class ShipperController {
  constructor(private readonly ShiperService: ShipperService) {}

  @Post()
  create(@Body() createShipperDto: CreateShipperDto) {
    return this.ShiperService.create(createShipperDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.ShiperService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ShiperService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipperDto: UpdateShipperDto) {
    return this.ShiperService.update(id, updateShipperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ShiperService.remove(id);
  }
}
