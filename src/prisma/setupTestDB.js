import { execSync } from 'child_process';

export default async () => {
  console.log('Preparando banco de testes...');
  execSync('npx prisma migrate deploy --schema=prisma/schema.prisma');
  console.log('Banco de testes pronto.');
};
