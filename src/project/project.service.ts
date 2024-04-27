import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateProjectDTO): Promise<{ project: Project }> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { name: body.name },
      });

      if (project) {
        throw new UnprocessableEntityException(
          'Project with this name already exists',
        );
      }

      const newProject = await this.prisma.project.create({
        data: body,
      });

      return { project: newProject };
    } catch (error) {
      throw error;
    }
  }
}