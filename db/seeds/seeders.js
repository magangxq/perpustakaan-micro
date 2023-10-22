import Sequelize from "sequelize";
import User from "../../models/UserModel";
import argon2 from "argon2";

async function hashPassword(password) {
  const salt = await argon2.generateSalt();
  const hash = await argon2.hash(password, salt);
  return hash;
}

module.exports = {
  async seedUsers() {
    const users = [
      {
        name: "developer",
        email: "dev@developer.com",
        password: await hashPassword('dev'),
        nik_nis: 1,
        registration_status: "diterima",
        role: "developer"
      },
      {
        name: "admin",
        email: "admin@example.com",
        password: await hashPassword('admin'),
        nik_nis: 2,
        registration_status: "diterima",
        role: "admin"
      },
      {
        name: "pustakawan",
        email: "pustakawan@example.com",
        password: await hashPassword('pustakawan'),
        nik_nis: 3,
        registration_status: "diterima",
        role: "pustakawan"
      },
      {
        name: "user1",
        email: "user1@example.com",
        password: await hashPassword('user1'),
        nik_nis: 2934871512,
        registration_status: "diterima"
      },
      {
        name: "user2",
        email: "user2@example.com",
        password: await hashPassword('user2'),
        nik_nis: 1928375622,
        registration_status: "diterima"
      },
      {
        name: "user3",
        email: "user3@example.com",
        password: await hashPassword('user3'),
        nik_nis: 1289376423,
        registration_status: "diterima"
      },
      {
        name: "user4",
        email: "user4@example.com",
        password: await hashPassword('user4'),
        nik_nis: 2837641212
      },
      {
        name: "user5",
        email: "user5@example.com",
        password: await hashPassword('user5'),
        nik_nis: 1293759343
      },
      {
        name: "user6",
        email: "user6@example.com",
        password: await hashPassword('user6'),
        nik_nis: 19200282374
      }
    ];

    users.forEach(async (user) => {
      await User.create(user);
    });
  },
};
