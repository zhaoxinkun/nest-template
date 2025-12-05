import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
    ],
  });

  await prisma.user.create({
    data: {
      username: 'root',
      password: '123456',
      roles: {
        connect: [{ id: 1 }],
      },
    },
  });
}

main()
  .then(() => {
    console.log('Seed finished');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
