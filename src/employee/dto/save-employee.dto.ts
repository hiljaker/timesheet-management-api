import { IsNumber, IsString } from 'class-validator';

export class SaveEmployeeDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly rate: number;
}
