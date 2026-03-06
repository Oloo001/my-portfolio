import 'dotenv/config'; 
import { prisma } from '../lib/prisma.js';
  
async function main() {
  console.log("Emptying database...");
  await prisma.contact.deleteMany();

  console.log("Seeding data...");
  await prisma.contact.createMany({
    data: [
      { name: "Ana Silva", email: "ana@email.com", phone: "555-0101" },
      { name: "John Doe", email: "john@email.com", phone: "555-0102" },
      { name: "Maria Santos", email: "maria@email.com", phone: "555-0103" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded!ENKARE");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });