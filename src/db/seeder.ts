import prisma from "./connection";
import bcrypt from "bcrypt";

async function main() {
  // const test = await prisma.user.create({
  //   data: {
  //     name: "test",
  //     email: "test@gmail.com",
  //     password: await bcrypt.hash("rahasia", 10),
  //   },
  // });

  // console.log(test);

  const todoMockUp = await prisma.note.create({
    data: {
      title: "test",
      note: "test my todo",
      isArchive: false,
      userId: 1,
    },
  });
  console.log(todoMockUp);

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
