import supertest from "supertest";
import authRouter from "./authRouter.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authUser from "./authUser.js";
import authController from "./authController.js";
import express from "express";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/api", authRouter);
  return app;
}

beforeEach((done) => {
  mongoose.disconnect();
  mongoose.connect(
    "mongodb://localhost:27017/acmedb",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

test("POST /registration", async () => {
  const data = {
    email: "m1yag@mail.ru",
    userName: "TimDoe1",
    password: "123451",
  };

  const response = await supertest(app)
    .post("/api/registration")
    .send(data)
    .expect(200);

  expect(response.status).toBe(200);
  expect(response.body._id).toBeTruthy();
});

const userInput = {
  userName: "TimDoe",
  email: "myag@mail.ru",
  password: "12345",
};

describe("app", () => {
  describe("get user", () => {
    it("should return user", async () => {
      const user = new authUser(userInput);
      await user.save();
      const foundUser = await authUser.findOne({ userName: "TimDoe" });
      const expected = user.userName;
      const actual = foundUser.userName;
      expect(actual).toEqual(expected);
    });
  });

  describe("save user", () => {
    it("should return saved user", async () => {
      const user = new authUser(userInput);
      const saved = await user.save();
      const expected = user.userName;
      const actual = saved.userName;
      expect(actual).toEqual(expected);
    });
  });

  describe("update user", () => {
    it("should return updated user", async () => {
      const user = new authUser(userInput);
      await user.save();
      user.userName = "newname";
      const updated = await user.save();
      const expected = "newname";
      const actual = updated.userName;
      expect(actual).toEqual(expected);
    });
  });
});
