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
  create(@Body() body: any) {
    return this.medicsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.medicsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicsService.remove(id);
  }
}
