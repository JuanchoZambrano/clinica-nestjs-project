import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateMedicDto } from './dto/update.medic.dto.js';

@Injectable()
export class MedicsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findExistingMedicModel(professionalCode: string) {
    return this.prisma.medic.findFirst({
      where: {
        OR: [{ professionalCode }],
      },
      select: {
        id: true,
        professionalCode: true,
      },
    });
  }

  async findAll() {
    return this.prisma.medic.findMany();
  }

  async findOne(id: number) {
    const numericId = Number(id);
    const medic = await this.prisma.medic.findUnique({
      where: { id: numericId },
      select: {
        id: true,
        professionalCode: true,
        medicPhone: true,
        user: {
          select: {
            userName: true,
            userEmail: true,
            status: true,
          },
        },
        specialty: {
          select: {
            id: true,
            specialtyName: true,
          },
        },
        appointments: {
          orderBy: { appointmentDate: 'desc' },
          select: {
            id: true,
            appointmentDate: true,
            observation: true,
            status: true,
            patient: {
              select: {
                patientName: true,
                patientLastName: true,
                personalId: true,
              },
            },
          },
        },
      },
    });

    if (!medic) {
      throw new NotFoundException(`El paciente con ID ${id} no existe`);
    }

    return medic;
  }

  async create(data: {
    professionalCode: string;
    medicPhone?: string;
    userId: number;
    specialtyId: number;
  }) {
    const existingMedic = await this.findExistingMedicModel(
      data.professionalCode,
    );

    if (existingMedic) {
      throw new ConflictException('El codigo del medico ya existe.');
    }

    return this.prisma.medic.create({
      data,
      select: {
        id: true,
        professionalCode: true,
        specialtyId: true,
      },
    });
  }

  async update(id: number, updateMedicDto: UpdateMedicDto) {
    const numericId = Number(id);
    return await this.prisma.medic.update({
      where: { id: numericId },
      data: {
        ...updateMedicDto,
      },
    });
  }

  async remove(id: number) {
    const numericId = Number(id);
    return await this.prisma.medic.delete({
      where: { id: numericId },
    });
  }
}
