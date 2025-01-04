import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MetasService } from './metas.service';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { Response } from 'express';
import { DeleteMetaDto } from './dto/delete-meta.dto';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Post()
  async create(@Body() createMetaDto: CreateMetaDto, @Res() res: Response) {
    try {
      const meta = await this.metasService.create(createMetaDto);

      if (typeof meta === 'object' && 'message' in meta) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: meta.message || 'Error al crear la Meta',
          response: null,
        });
      }

      return res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Meta creada correctamente',
        response: meta,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al crear la Meta: ${error}`,
        response: null,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const metas = await this.metasService.findAll();

      if (Array.isArray(metas) && metas.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontraron Metas',
          response: null,
        });
      } else if (typeof metas === 'object' && 'message' in metas) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: metas.message || 'Error al obtener las Metas',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Metas obtenidas correctamente',
        response: metas,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al obtener las Metas: ${error}`,
        response: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const meta = await this.metasService.findOne(+id);

      if (!meta) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró la Meta',
          response: null,
        });
      } else if (typeof meta === 'object' && 'message' in meta) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: meta.message || 'Error al obtener la Meta',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Meta obtenida correctamente',
        response: meta,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al obtener la Meta: ${error}`,
        response: null,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMetaDto: UpdateMetaDto,
    @Res() res: Response,
  ) {
    try {
      const meta = await this.metasService.update(+id, updateMetaDto);

      if (!meta) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró la Meta',
          response: null,
        });
      } else if (typeof meta === 'object' && 'message' in meta) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: meta.message || 'Error al actualizar la Meta',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Meta actualizada correctamente',
        response: meta,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al actualizar la Meta: ${error}`,
        response: null,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() deleteMetaDto: DeleteMetaDto,
    @Res() res: Response,
  ) {
    try {
      const meta = await this.metasService.remove(+id, deleteMetaDto);

      if (!meta) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró la Meta',
          response: null,
        });
      } else if (typeof meta === 'object' && 'message' in meta) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: meta.message || 'Error al actualizar la Meta',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Meta actualizada correctamente',
        response: meta,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al actualizar la Meta: ${error}`,
        response: null,
      });
    }
  }
}
