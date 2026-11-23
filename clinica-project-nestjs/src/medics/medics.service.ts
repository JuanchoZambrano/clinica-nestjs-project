import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.medic.findMany();
  }
}
