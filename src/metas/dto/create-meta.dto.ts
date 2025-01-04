import { Meta } from '@prisma/client';
import {
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class CreateMetaDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly deadline: Date;

  @IsString()
  @IsEnum(['active', 'inactive', 'completed'])
  readonly state: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  readonly progress: number = 0.0;

  @IsOptional()
  @IsString()
  readonly image?: string = null;

  @IsString()
  readonly color: string;

  @IsBoolean()
  readonly enabled: boolean = true;
}
