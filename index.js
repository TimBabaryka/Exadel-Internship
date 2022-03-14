import express from "express";
import mongoose from "mongoose";
import router from "./postUser/router.js";

const port = process.env.PORT || 3000;
const DB_URL = `mongodb+srv://admin:123qaz@cluster0.tihym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Working on server ${port}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
