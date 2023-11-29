import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PW, {
    host: "localhost",
    dialect: "postgresql"
});

export default db;