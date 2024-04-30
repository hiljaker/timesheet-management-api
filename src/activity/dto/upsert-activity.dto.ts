import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpsertActivityDTO {
  @IsBoolean()
  @IsOptional()
  readonly editMode?: boolean;

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
