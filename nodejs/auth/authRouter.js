import Router from "express";
import authController from "./authController.js";
import { check } from "express-validator";
import { authMiddleware } from "./middlwear/authMiddleware.js";
import { roleMiddleware } from "./middlwear/roleMiddleware.js";
import mongoose from "mongoose";
import authUser from "./authUser.js";

import jwt from "jsonwebtoken";
import secret from "dotenv/config";

const authRouter = new Router();

authRouter.post(
  "/registration",

  [check("userName", " User name cannot be empty").notEmpty()],
  [check("email", " Please use email address").isEmail()],
  [
    check(
      "password",
      " Password should contain at least 4 symbols and maximum 10 symbols"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
// authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

authRouter.put("/users", authController.updatePost);
authRouter.delete("/users/:id", authController.postDelete);

authRouter.get("/login", authController.login);

authRouter.post("/healthCheck", (req, res) => {
  return res.send({ message: "Health is ok!" });
});

export default authRouter;
