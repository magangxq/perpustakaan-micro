import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import argon2 from "argon2";

async function hashPassword(password) {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  }

  

async function main() {
  const now = new Date();
  await prisma.users.create({
    data: {
        name: "developer",
        email: "dev@developer.com",
        password: await hashPassword('dev'),
        nik_nis: 1,
        registration_status: "Verified",
        role: "Developer",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "admin",
        email: "admin@example.com",
        password: await hashPassword('admin'),
        nik_nis: 2,
        registration_status: "Verified",
        role: "Admin",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "pustakawan",
        email: "pustakawan@example.com",
        password: await hashPassword('pustakawan'),
        nik_nis: 3,
        registration_status: "Verified",
        role: "Librarian",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user1",
        email: "user1@example.com",
        password: await hashPassword('user1'),
        nik_nis: 111,
        registration_status: "Verified",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user2",
        email: "user2@example.com",
        password: await hashPassword('user2'),
        nik_nis: 222,
        registration_status: "Verified",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user3",
        email: "user3@example.com",
        password: await hashPassword('user3'),
        nik_nis: 333,
        registration_status: "Verified",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user4",
        email: "user4@example.com",
        password: await hashPassword('user4'),
        nik_nis: 444,
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user5",
        email: "user5@example.com",
        password: await hashPassword('user5'),
        nik_nis: 555,
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        name: "user6",
        email: "user6@example.com",
        password: await hashPassword('user6'),
        nik_nis: 666,
        createdAt: now,
        updatedAt: now
    },
  });
  console.log("success create Users");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
