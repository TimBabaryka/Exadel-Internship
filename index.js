import express from "express";
import mongoose from "mongoose";
import router from "./postUser/router.js";
import authRouter from "./auth/authRouter.js";

const PORT = 3000;
const DB_URL = `mongodb+srv://admin:123qaz@cluster0.tihym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use("/api", router);
app.use("/auth", authRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("Working on server " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
