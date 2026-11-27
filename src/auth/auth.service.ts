import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { userEmail: registerDto.userEmail },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const role = await this.prisma.role.findUnique({
      where: { id: registerDto.roleId },
    });

    if (!role) {
      throw new BadRequestException(
        `No existe un rol con el ID ${registerDto.roleId}`,
      );
    }

    const passwordHash = await bcrypt.hash(registerDto.userPassword, 10);
    return this.prisma.user.create({
      data: { ...registerDto, userPassword: passwordHash },
      select: { id: true, userName: true, userEmail: true, role: true },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { userEmail: loginDto.userEmail },
      include: {
        role: true,
      },
    });
    if (
      !user ||
      !(await bcrypt.compare(loginDto.userPassword, user.userPassword))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = jwt.sign(
      { id: user.id, email: user.userEmail, role: user.role.roleName },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );
    return { token };
  }
}
