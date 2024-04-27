import { Injectable } from '@nestjs/common';
import { UpsertActivityDTO } from './dto/upsert-activity.dto';
import { Activity } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';

type Order = 'asc' | 'desc';

type SortingOptions = {
  title: Order;
  project: Order;
  startDate: Order;
  endDate: Order;
  startTime: Order;
  endTime: Order;
  duration: Order;
};

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async updateOrCreate(
    activityId: number,
    body: UpsertActivityDTO,
  ): Promise<{ activity: Activity }> {
    try {
      const duration = differenceInMilliseconds(
        new Date(body.endTime),
        new Date(body.startTime),
      );

      const payload = { ...body, duration };

      const activity = await this.prisma.activity.upsert({
        where: { id: activityId },
        update: payload,
        create: payload,
      });

      return { activity };
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    employeeId: number,
    query: {
      filter: { projects: string[]; search: string };
      sortings: SortingOptions;
    },
  ): Promise<{ activities: Activity[] }> {
    try {
      const { filter, sortings } = query;

      const whereClause = {};
      const activitySortings = {};

      if (filter.projects) {
        const projects = Array.isArray(filter.projects)
          ? filter.projects
          : [filter.projects];

        whereClause['project'] = {
          name: {
            in: projects,
          },
        };
      }

      if (filter.search) {
        whereClause['title'] = {
          contains: `%${filter.search}%`,
        };
      }

      for (const key in sortings) {
        if (sortings[key]) {
          if (key === 'project') {
            activitySortings['project'] = {
              name: sortings.project,
            };
          } else {
            activitySortings[key] = sortings[key];
          }
        }
      }

      const activities = await this.prisma.activity.findMany({
        orderBy: activitySortings,
        where: {
          employeeId,
          ...whereClause,
        },
        include: {
          project: true,
        },
      });

      return { activities };
    } catch (error) {
      throw error;
    }
  }

  async findOne(activityId: number): Promise<{ activity: Activity }> {
    try {
      const activity = await this.prisma.activity.findUnique({
        where: { id: activityId },
        include: {
          project: true,
        },
      });

      return { activity };
    } catch (error) {
      throw error;
    }
  }

  async delete(activityId: number): Promise<void> {
    try {
      await this.prisma.activity.delete({
        where: { id: activityId },
      });
    } catch (error) {
      throw error;
    }
  }
}
