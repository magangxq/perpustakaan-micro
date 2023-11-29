import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Books from "./BookModel.js";

const { DataTypes } = Sequelize;

const Borrows = db.define(
  "borrow",
  {
    borrowing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    borrowing_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Borrowed",
      validate: {
        notEmpty: true,
      },
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    returned_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Associations
Borrows.belongsTo(Users, { foreignKey: 'userId' });
Borrows.belongsTo(Books, { foreignKey: 'bookId' });

export default Borrows;
