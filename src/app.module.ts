import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { MetasModule } from './metas/metas.module';
@Module({
  imports: [ProductsModule, MetasModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
