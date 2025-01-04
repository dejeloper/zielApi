import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$executeRawUnsafe(`DELETE FROM Product;`);
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'Product';`,
  );

  console.log('Table Product truncated and IDs reset.');

  await prisma.product.createMany({
    data: [
      {
        name: 'Monitor',
        description: 'Monitor Gaming',
        price: 100,
        image:
          'https://http2.mlstatic.com/D_NQ_NP_881947-MLU69957547955_062023-O.webp',
      },
      {
        name: 'Mouse',
        description: 'Mouse Gaming',
        price: 100,
        image: 'https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg',
      },
      {
        name: 'Teclado',
        description: 'Teclado Gaming',
        price: 100,
        image:
          'https://http2.mlstatic.com/D_NQ_NP_965588-MLA50158986098_062022-O.webp',
      },
      {
        name: 'Audifonos',
        description: 'Audifonos Gaming',
        price: 100,
        image:
          'https://exitocol.vtexassets.com/arquivos/ids/8859226/diadema-gamer-pro-phoinikas-g2000-bluetooth-inalambrica-azul.jpg',
      },
    ],
  });

  console.log('Products created!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
