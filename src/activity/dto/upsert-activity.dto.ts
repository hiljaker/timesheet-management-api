import { IsDateString, IsNumber, IsString } from 'class-validator';

export class UpsertActivityDTO {
  @IsNumber()
  readonly employeeId: number;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly projectId: number;

  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;

  @IsDateString()
  readonly startTime: string;

  @IsDateString()
  readonly endTime: string;
}
