import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { PatientsService } from './patients.service.js';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.patientsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.patientsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientsService.remove(id);
  }
}
