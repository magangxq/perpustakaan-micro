import dotenv from "dotenv";
import db from "../config/Database.js";
import { store } from "../index.js";
import Borrows from "./BorrowModel.js";
dotenv.config();

(async () => {
  await db.sync();
})();

store.sync();
