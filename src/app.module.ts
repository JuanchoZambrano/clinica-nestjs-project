import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { PatientsModule } from './patients/patients.module.js';
import { MedicsModule } from './medics/medics.module.js';

@Module({
  imports: [PrismaModule, PatientsModule, MedicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
