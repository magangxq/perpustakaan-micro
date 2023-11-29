import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  await prisma.book.create({
    data: {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      author: "J.R.R. Tolkien",
      publisher: "George Allen & Unwin",
      publication_year: new Date("1954-07-29"),
      description:
        "The first book in the Lord of the Rings trilogy, in which the young hobbit Frodo Baggins is entrusted with the Ring of Power, the One Ring, an evil artifact created by the Dark Lord Sauron.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "The Lord of the Rings: The Two Towers",
      author: "J.R.R. Tolkien",
      publisher: "George Allen & Unwin",
      publication_year: new Date("1954-11-11"),
      description:
        "The second book in the Lord of the Rings trilogy, in which the Fellowship of the Ring is broken apart and Frodo and Sam set out on their journey to Mordor to destroy the One Ring.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "The Lord of the Rings: The Return of the King",
      author: "J.R.R. Tolkien",
      publisher: "George Allen & Unwin",
      publication_year: new Date("1955-10-20"),
      description:
        "The third and final book in the Lord of the Rings trilogy, in which Frodo and Sam continue their journey to Mordor to destroy the One Ring, while Aragorn, Legolas, Gimli, and Boromir set out to rescue Merry and Pippin from the orcs.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publisher: "George Allen & Unwin",
      publication_year: new Date("1937-09-21"),
      description:
        "A prequel to the Lord of the Rings trilogy, in which the hobbit Bilbo Baggins sets out on a journey to the Lonely Mountain to reclaim the lost treasure of the dwarves from the dragon Smaug.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publisher: "Bloomsbury Publishing",
      publication_year: new Date("1997-06-26"),
      description:
        "The first book in the Harry Potter series, in which the orphaned Harry Potter is invited to attend Hogwarts School of Witchcraft and Wizardry, where he learns about magic and makes new friends.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      publisher: "Bloomsbury Publishing",
      publication_year: new Date("1998-07-02"),
      description:
        "The second book in the Harry Potter series, in which Harry investigates a series of mysterious attacks at Hogwarts, which are rumored to be caused by a monster living in the Chamber of Secrets.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      publisher: "Bloomsbury Publishing",
      publication_year: new Date("1999-07-08"),
      description:
        "The third book in the Harry Potter series, in which Harry learns that Sirius Black, a convicted murderer who escaped from Azkaban prison, is coming after him.",
      book_status: "Available",
      createdAt: now,
      updatedAt: now,
    },
  });

  console.log("success create Books");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
