import { Controller, Get } from '@nestjs/common';
import { MedicsService } from './medics.service.js';

@Controller('medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Get()
  findAll() {
    return this.medicsService.findAll();
  }
}
