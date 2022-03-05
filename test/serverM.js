const express = require("express");
const userRouter = require("./users");

const app = express();

app.use(express.json());

const users = [];
