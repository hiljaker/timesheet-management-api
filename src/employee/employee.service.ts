import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveEmployeeDTO } from './dto/save-employee.dto';
import { Employee } from '@prisma/client';
import { TokenService } from '../token/token.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async save(
    body: SaveEmployeeDTO,
  ): Promise<{ employee: Employee; accessToken: string }> {
    try {
      const employee = await this.prisma.employee.upsert({
        where: { name: body.name },
        update: body,
        create: body,
      });

      const accessToken = this.tokenService.signAccessToken({
        id: String(employee.id),
      });

      return { employee, accessToken };
    } catch (error) {
      throw error;
    }
  }

  async refresh(employeeId: number): Promise<{ employee: Employee }> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id: employeeId },
      });

      return { employee };
    } catch (error) {
      throw error;
    }
  }
}
