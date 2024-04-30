import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateProjectDTO): Promise<{ project: Project }> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { name: body.name },
      });

      if (project) {
        throw new UnprocessableEntityException('Nama proyek sudah ada');
      }

      const newProject = await this.prisma.project.create({
        data: body,
      });

      return { project: newProject };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<{ projects: Project[] }> {
    try {
      const projects = await this.prisma.project.findMany();
      return { projects };
    } catch (error) {
      throw error;
    }
  }
}
