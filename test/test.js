const express = require("express");
const userRouter = require("./users");

const app = express();

// const logger = (req, res, next) => {
//   console.log(`${new Date().toString()} - ${req.method} ${req.path} `);
//   next();
// };

// app.use(logger);
app.use(express.json());

const users = [
  { id: 0, email: 0, password: 0, role: 0 },
  // { name: "Adam", age: 10 },
  // { name: "Bob", age: 20 },
  // { name: "Jane", age: 30 },
];

// app.get("/:id", (req, res) => {
//   const user = users[req.params.id];
//   res.send({ user });
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   users.push(req.body);
//   res.send("Hello");
// });

app.use("/users", userRouter);

app.listen(3000);
