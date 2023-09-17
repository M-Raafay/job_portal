import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

// script is added in package.json
// seed will run with migration
// "prisma": {
//     "seed": "ts-node prisma/seed.ts"
//   }
async function main() {

    const newUUID = uuidv4();

    const user1 = await prisma.users.upsert({ 
    where: { id: newUUID},
    update: {},
    create: {
      firstName: 'Muhammad',
      middleName:'Ali',
      lastName: 'Khan',
      email:'ali@gmail.com',
      password:'12345',
      mobilePhone:+923874073172,
      whatsapp:+923874073172,
      role: 'User'
    },
  });

  const user2 = await prisma.users.upsert({
    where: { id: newUUID},
    update: {},
    create: {
      firstName: 'Muhammad',
      middleName:'Hussain',
      lastName: 'Baloch',
      email:'hussain@gmail.com',
      password:'12345',
      mobilePhone:+923226885320,
      whatsapp:+923226885320,
      role: 'Admin'
    },
  });
  const user3 = await prisma.users.upsert({
    where: { id: newUUID},
    update: {},
    create: {
      firstName: 'Muhammad',
      middleName:'Saboor',
      lastName: 'Bilal',
      email:'saboor@gmail.com',
      password:'12345',
      mobilePhone:+923106780987,
      whatsapp:+923106780987,
      role: 'User'
    },
  });
  const user4 = await prisma.users.upsert({
    where: { id: newUUID},
    update: {},
    create: {
      firstName: 'Muhammad',
      middleName:'Daniyal',
      lastName: 'Sajjad',
      email:'daniyal@gmail.com',
      password:'12345',
      mobilePhone:+923439007806,
      whatsapp:+923439007806,
      role: 'Super_Admin'
    },
   })
  console.log( 'users created' );
}

main()
  .catch((error) => {
    console.log(error.message)
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
