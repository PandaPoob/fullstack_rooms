import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { UserCreateInput } from "@/lib/prisma-types";
const prisma = new PrismaClient();

async function main() {
  //STATUS
  await prisma.status.createMany({
    data: [{ title: "Available" }, { title: "Busy" }, { title: "Away" }],
  });

  //FIND DEFAULT STATUS
  const defaultStatus = await prisma.status.findUnique({
    where: {
      title: "Available",
    },
  });
  const hashedPassword = await hash("Pw12345678", 10);
  const currentDate = new Date();
  const isoDateString = currentDate.toISOString();

  //USERS
  const user1 = await prisma.user.create({
    data: {
      first_name: "Freja",
      last_name: "Smith",
      email: "freja@mail.com",
      email_verified_at: isoDateString,
      password: hashedPassword,
      birthday: "1998-11-30",
      status: { connect: { id: defaultStatus?.id } },
    },
  } as UserCreateInput);
  const user2 = await prisma.user.create({
    data: {
      first_name: "Freddy",
      last_name: "Frog",
      email: "fred@mail.com",
      email_verified_at: isoDateString,
      password: hashedPassword,
      birthday: "1997-11-10",
      status: { connect: { id: defaultStatus?.id } },
    },
  } as UserCreateInput);
  const user3 = await prisma.user.create({
    data: {
      first_name: "Cleo",
      last_name: "Zalli",
      email: "cleo@mail.com",
      email_verified_at: isoDateString,
      password: hashedPassword,
      birthday: "1998-11-30",
      status: { connect: { id: defaultStatus?.id } },
    },
  } as UserCreateInput);

  //ROOMS
  const room1 = await prisma.room.create({
    data: {
      title: "Morbærhaven",
      admin: { connect: { id: user1.id } },
    },
  });

  const room2 = await prisma.room.create({
    data: {
      title: "Cleo's Crib",
      admin: { connect: { id: user3.id } },
    },
  });

  //PARTICIPANTS
  // Connect user1 to both rooms
  await prisma.participant.create({
    data: {
      user: { connect: { id: user1.id } },
      room: { connect: { id: room1.id } },
      is_favourited: false,
      // Other participant data
    },
  });
  await prisma.participant.create({
    data: {
      user: { connect: { id: user1.id } },
      room: { connect: { id: room2.id } },
      is_favourited: false,
      // Other participant data
    },
  });

  // Connect user2 to both rooms
  await prisma.participant.create({
    data: {
      user: { connect: { id: user2.id } },
      room: { connect: { id: room1.id } },
      is_favourited: false,
      // Other participant data
    },
  });
  await prisma.participant.create({
    data: {
      user: { connect: { id: user2.id } },
      room: { connect: { id: room2.id } },
      is_favourited: false,
      // Other participant data
    },
  });

  // Connect user3 to both rooms
  await prisma.participant.create({
    data: {
      user: { connect: { id: user3.id } },
      room: { connect: { id: room1.id } },
      is_favourited: false,
      // Other participant data
    },
  });
  await prisma.participant.create({
    data: {
      user: { connect: { id: user3.id } },
      room: { connect: { id: room2.id } },
      is_favourited: false,
      // Other participant data
    },
  });
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
