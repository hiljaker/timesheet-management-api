import { IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  readonly name: string;
}
