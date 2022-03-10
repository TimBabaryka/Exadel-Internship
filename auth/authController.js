import authRole from "./authRole.js";
import authUser from "./authUser.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import secret from "dotenv/config";

// import { json } from "express";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.secret, { expiresIn: "1h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration failed", errors });
      }
      const { userName, email, password } = req.body;
      const candidate = await authUser.findOne({ userName });
      const candidate2 = await authUser.findOne({ email });
      if (candidate || candidate2) {
        return res.status(400).json({ message: "User exist" });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await authRole.findOne({ value: "USER" });
      const user = new authUser({
        userName,
        email,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User was successfully registered" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }
  async login(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await authUser.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: `Can't find the user ${user}` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login failed" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await authUser.find();
      //   const userRole = new authRole();
      //   const adminRole = new authRole({ value: "ADMIN" });
      //   await userRole.save();
      //   await adminRole.save();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }
}

export default new AuthController();
