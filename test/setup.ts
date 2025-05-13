import 'jest';
import { prisma } from '../src/prisma/client';


beforeEach(async () => {
    await prisma.produto.deleteMany();
  });

afterAll(async () => {
  await prisma.$disconnect();
});
