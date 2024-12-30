import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Product already exists');
        }
      }

      throw new InternalServerErrorException(
        `Error creating product: ${error}`,
      );
    }
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!productFound) {
      throw new NotFoundException(`No product found with id ${id}`);
    }

    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productUpdated = await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });

      if (!productUpdated) {
        throw new NotFoundException(`No product found with id ${id}`);
      }

      return productUpdated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const errorMessage = error['meta'].cause;
          throw new ConflictException(`Dont update product. ${errorMessage}`);
        }
      }
      throw new InternalServerErrorException(
        `Error updating product: ${error}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const productDeleted = await this.prismaService.product.delete({
        where: { id },
      });

      if (!productDeleted) {
        throw new NotFoundException(`No product found with id ${id}`);
      }

      return { response: `Product ${id} was deleted` };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const errorMessage = error['meta'].cause;
          throw new ConflictException(`Dont delete product. ${errorMessage}`);
        }
      }
      throw new InternalServerErrorException(
        `Error deleting product: ${error}`,
      );
    }
  }
}
