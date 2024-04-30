import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { SaveEmployeeDTO } from './dto/save-employee.dto';
import { Request, Response } from 'express';
import { ResponseType } from '../types/response.type';
import { EmployeeGuard } from './employee.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(EmployeeGuard)
  @Post('')
  async save(
    @Req() req: Request,
    @Res()
    res: Response<ResponseType<{ employee: Employee; accessToken: string }>>,
    @Body() body: SaveEmployeeDTO,
  ) {
    try {
      const employeeId = +req.user.id || 0;

      const result = await this.employeeService.save(employeeId, body);

      return res.send({
        message: 'Berhasil menyimpan karyawan',
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(EmployeeGuard)
  @Get('')
  async refresh(
    @Req() req: Request,
    @Res() res: Response<ResponseType<{ employee: Employee }>>,
  ) {
    try {
      const employeeId = +req.user.id;

      const result = await this.employeeService.refresh(employeeId);

      return res.send({
        message: 'Authorized',
        result,
      });
    } catch (error) {
      throw error;
    }
  }
}
