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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('medics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'RECEPTIONIST')
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
