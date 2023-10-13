import { IsNotEmpty } from 'class-validator';

export class EnvironmentDto {
  @IsNotEmpty()
  readonly name: string;

  readonly createdAt: Date;
  readonly description: string;
  readonly projectId: number;
}
