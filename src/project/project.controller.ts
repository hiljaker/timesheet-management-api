import { Body, Controller, Post, Res } from '@nestjs/common';
import { Project } from '@prisma/client';
import { Response } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ResponseType } from 'src/types/response.type';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('')
  async create(
    @Res() res: Response<ResponseType<{ project: Project }>>,
    @Body() body: CreateProjectDTO,
  ) {
    try {
      const result = await this.projectService.create(body);

      return res.send({ message: 'Success creating new project', result });
    } catch (error) {
      throw error;
    }
  }
}
