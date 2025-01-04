import { PartialType } from '@nestjs/mapped-types';
import { CreateMetaDto } from './create-meta.dto';

export class DeleteMetaDto extends PartialType(CreateMetaDto) {}
