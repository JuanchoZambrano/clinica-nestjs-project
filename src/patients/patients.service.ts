import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findExistingPatientModel(
    personalId: string,
    patientEmail: string,
  ) {
    return this.prisma.patient.findFirst({
      where: {
        OR: [{ personalId }, { patientEmail }],
      },
      select: {
        id: true,
        personalId: true,
        patientEmail: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.patient.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const numericId = Number(id);
    const patient = await this.prisma.patient.findUnique({
      where: { id: numericId },
      include: {
        appointments: {
          orderBy: {
            appointmentDate: 'desc',
          },
          include: {
            medic: {
              include: {
                user: {
                  select: {
                    userName: true,
                    userEmail: true,
                  },
                },
                specialty: {
                  select: {
                    specialtyName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`El paciente con ID ${id} no existe`);
    }

    return patient;
  }

  async create(data: {
    patientName: string;
    patientLastName: string;
    personalId: string;
    birthDate: Date;
    patientEmail: string;
    patientPhone?: string;
    patientAddress?: string;
  }) {
    const existingPatient = await this.findExistingPatientModel(
      data.personalId,
      data.patientEmail,
    );

    if (existingPatient) {
      throw new ConflictException('El ID del paciente o email ya existen.');
    }

    return this.prisma.patient.create({
      data,
      select: {
        id: true,
        patientName: true,
        patientLastName: true,
        personalId: true,
        patientEmail: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      patientName?: string;
      patientLastName?: string;
      personalId?: string;
      birthDate?: Date;
      patientEmail?: string;
      patientPhone?: string;
      patientAddress?: string;
    },
  ) {
    const numericId = Number(id);
    return await this.prisma.patient.update({
      where: { id: numericId },
      data,
    });
  }

  async remove(id: number) {
    const numericId = Number(id);
    return await this.prisma.patient.delete({
      where: { id: numericId },
    });
  }
}
