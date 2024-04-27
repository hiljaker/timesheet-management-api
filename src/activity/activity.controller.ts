import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Request, Response } from 'express';
import { Activity } from '@prisma/client';
import { UpsertActivityDTO } from './dto/upsert-activity.dto';
import { EmployeeGuard } from 'src/employee/employee.guard';
import { ResponseType } from 'src/types/response.type';

type Order = 'asc' | 'desc';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(EmployeeGuard)
  @Post(':activityId')
  async updateOrCreate(
    @Req() req: Request,
    @Res() res: Response<ResponseType<{ activity: Activity }>>,
    @Body() body: UpsertActivityDTO,
  ) {
    try {
      const activityId = +req.params.activityId;

      const result = await this.activityService.updateOrCreate(
        activityId,
        body,
      );

      return res.send({
        message: 'Success creating activity',
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(EmployeeGuard)
  @Get('')
  async findAll(
    @Req() req: Request,
    @Res() res: Response<ResponseType<{ activities: Activity[] }>>,
  ) {
    try {
      const employeeId = +req.user.id;

      const {
        search,
        projects,
        title,
        project,
        startDate,
        endDate,
        startTime,
        endTime,
        duration,
      } = req.query;

      const sortings = {
        title: title as Order,
        project: project as Order,
        startDate: startDate as Order,
        endDate: endDate as Order,
        startTime: startTime as Order,
        endTime: endTime as Order,
        duration: duration as Order,
      };

      const result = await this.activityService.findAll(employeeId, {
        filter: {
          projects: projects as string[],
          search: search && String(search),
        },
        sortings,
      });

      return res.send({
        message: 'Success retrieving activities',
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(EmployeeGuard)
  @Get(':activityId')
  async findOne(
    @Req() req: Request,
    @Res() res: Response<ResponseType<{ activity: Activity }>>,
  ) {
    try {
      const activityId = +req.params.activityId;

      const result = await this.activityService.findOne(activityId);

      return res.send({
        message: 'Success retrieving activity',
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(EmployeeGuard)
  @Delete(':activityId')
  async delete(
    @Req() req: Request,
    @Res() res: Response<ResponseType<{ activity: Activity }>>,
  ) {
    try {
      const activityId = +req.params.activityId;

      await this.activityService.delete(activityId);

      return res.send({
        message: 'Success deleting activity',
      });
    } catch (error) {
      throw error;
    }
  }
}
