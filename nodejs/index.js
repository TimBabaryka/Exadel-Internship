import mongoose from "mongoose";
import express from "express";
import authRouter from "./auth/authRouter.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/auth", authRouter);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Working on server ${port}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
