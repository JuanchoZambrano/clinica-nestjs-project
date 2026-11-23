import { Module } from '@nestjs/common';
import { MedicsController } from './medics.controller.js';
import { MedicsService } from './medics.service.js';

@Module({
  controllers: [MedicsController],
  providers: [MedicsService]
})
export class MedicsModule {}
