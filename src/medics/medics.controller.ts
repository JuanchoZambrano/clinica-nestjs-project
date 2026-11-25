import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MedicsService } from './medics.service.js';
import { CreateMedicDto } from './dto/create.medic.dto.js';
import { UpdateMedicDto } from './dto/update.medic.dto.js';

@Controller('medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Get()
  findAll() {
    return this.medicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMedicDto) {
    return this.medicsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMedicDto) {
    return this.medicsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicsService.remove(id);
  }
}
