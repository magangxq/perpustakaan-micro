import {Sequelize} from "sequelize";

const db = new Sequelize('perpustakaan', 'postgres', 'biasanyabisa', {
    host: "localhost",
    dialect: "postgresql"
});

export default db;