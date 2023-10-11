import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  readonly name: string;

  readonly createdAt: Date;
  readonly description: string;
}
