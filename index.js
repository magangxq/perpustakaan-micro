import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import BookRoute from "./routes/BookRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";
import ApplicantRoute from "./routes/ApplicantRoute.js";
import BorrowRoute from "./routes/BorrowRoute.js"
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

export const store = new sessionStore({
  db: db,
});

// (async()=>{
//     await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/user", ProfileRoute);
app.use("/member-list", UserRoute);
app.use(BookRoute);
app.use("/auth", AuthRoute);
app.use(ApplicantRoute);
app.use(BorrowRoute)

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("💾 connected...");
});
