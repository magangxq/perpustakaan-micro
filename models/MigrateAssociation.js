import db from "../config/Database.js";
import { store } from "../index.js";
import Borrows from "./BorrowModel.js";

(async () => {
  try {
    await Borrows.sync({ force: true });
    console.log("Table Borrow created successfully");
  } catch (error) {
    console.error("Error creating table Borrow:", error);
  }
})();

