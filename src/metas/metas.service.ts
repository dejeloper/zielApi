import { Injectable } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Meta, Prisma } from '@prisma/client';
import { DeleteMetaDto } from './dto/delete-meta.dto';

@Injectable()
export class MetasService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createMetaDto: CreateMetaDto,
  ): Promise<{ message: string } | Meta> {
    try {
      return this.prismaService.meta.create({
        data: { ...createMetaDto },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return { message: 'Ya existe una Meta con ese nombre' };
        }
      }

      return { message: 'Error al crear la Meta' };
    }
  }

  async findAll() {
    try {
      return await this.prismaService.meta.findMany({ orderBy: { id: 'asc' } });
    } catch (error) {
      return {
        message: `Error al obtener las metas: ${error}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      const metaFound = await this.prismaService.meta.findUnique({
        where: { id },
      });

      if (!metaFound) {
        return {
          message: `No se encontró la meta con el id: ${id}`,
        };
      }
      return metaFound;
    } catch (error) {
      return {
        message: `Error al obtener la meta: ${error}`,
      };
    }
  }

  async update(id: number, updateMetaDto: UpdateMetaDto) {
    try {
      const metaUpdated = await this.prismaService.meta.findUnique({
        where: { id },
      });
      if (!metaUpdated) {
        return {
          message: `No se encontró la meta con el id: ${id}`,
        };
      }
      return await this.prismaService.meta.update({
        where: { id },
        data: updateMetaDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const errorMessage = error['meta'].cause;
          return {
            message: `No se actualizó la meta con el id: ${id}. ${errorMessage}`,
          };
        }
      }

      return {
        message: `Error al actualizar la meta: ${error}`,
      };
    }
  }

  async remove(id: number, deleteMetaDto: DeleteMetaDto) {
    try {
      const metaDeleted = await this.prismaService.meta.findUnique({
        where: { id },
      });
      if (!metaDeleted) {
        return {
          message: `No se encontró la meta con el id: ${id}`,
        };
      }
      return await this.prismaService.meta.update({
        where: { id },
        data: { ...deleteMetaDto, enabled: false },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const errorMessage = error['meta'].cause;
          return {
            message: `No se eliminó la meta con el id: ${id}. ${errorMessage}`,
          };
        }
      }
      return {
        message: `Error al eliminar la meta: ${error}`,
      };
    }
  }
}
