import authRole from "./authRole.js";
import authUser from "./authUser.js";
import bcrypt from "bcryptjs";
import { cookie, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import secret from "dotenv/config";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.secret, { expiresIn: "1h" });
};

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    console.log("body", req.body);

    const user = await authUser.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Can't find the email: ${email}` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Invalid password` });
    }
    if (email && validPassword === true) {
      return res.send({
        apiKey: generateAccessToken(user._id, user.roles),
        expiresIn: 10 * 60 * 1000,
      });
    }
    return res.status(401).send("Login failed");
  }

  async check(req, res) {
    try {
      const userName = "Nancy Gonich";
      const user = await authUser.findOne({ userName });
      if (user) {
        console.log(user);
        return res.json({ user });
      }
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration failed", errors });
      }
      const {
        userName,
        email,
        password,
        country,
        dateOfBirth,
        cardName,
        cardAmount,
        currency,
      } = req.body;
      const candidate = await authUser.findOne({ userName });
      const candidate2 = await authUser.findOne({ email });
      if (candidate || candidate2) {
        return res.status(400).json({ message: "User exist" });
      }
      const userRole = await authRole.findOne({ value: "USER" });
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new authUser({
        userName,
        email,
        password: hashPassword,
        roles: [userRole.value],
        dateOfBirth,
        country,
        cards: [
          {
            cardName: cardName,
            cardAmount: cardAmount,
            currency: currency,
          },
        ],
      });
      await user.save();
      res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async logout(req, res) {
    try {
      const { userName } = req.body;
      const user = await authUser.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: `Can't find the user ${user}` });
      }

      const token = req.headers.authorization.split(" ")[1];
      res.clearCookie(`${token}`, " ");

      return res.json({ message: `${token} deleted from cookie` });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Logout failed" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await authUser.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async updatePost(req, res) {
    try {
      const post = req.body;
      if (!post._id) {
        res.status(400).json({ message: ` ID does not exist` });
      }
      const updatedPost = await authUser.findByIdAndUpdate(post._id, post, {
        new: true,
      });
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async postDelete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: ` ID was not found` });
      }
      const deletedPost = await authUser.findByIdAndDelete(id);
      return res.json(deletedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteCard(req, res) {
    try {
      const { id, cardName } = req.body;
      console.log(id);
      const findClone = await authUser.updateOne(
        { _id: `${id}` },
        { $pull: { cards: { cardName: cardName } } }
      );
      return res.json(findClone);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deletedTransaction(req, res) {
    try {
      const { id, paidCard } = req.body;

      const deletedTran = await authUser.updateOne(
        { _id: `${id}` },
        { $pull: { transaction: { paidCard: paidCard } } }
      );
      return res.json(deletedTran);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addCard(req, res) {
    try {
      const { id, cardName, cardAmount, currency } = req.body;

      const createdCard = await authUser.findOneAndUpdate(
        { _id: `${id}` },
        {
          $addToSet: {
            cards: [
              {
                cardName: `${cardName}`,
                currency: `${currency}`,
                cardAmount: cardAmount,
              },
            ],
          },
        }
      );
      return res.json(createdCard);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addTransaction(req, res) {
    try {
      const { id, activity, paidCard, amount, date, payee, status, moneyIn } =
        req.body;

      const createdTran = await authUser.findOneAndUpdate(
        { _id: `${id}` },
        {
          $addToSet: {
            transaction: [
              {
                activity: `${activity}`,
                paidCard: `${paidCard}`,
                amount: amount,
                date: `${date}`,
                payee: `${payee}`,
                status: `${status}`,
                moneyIn: `${moneyIn}`,
              },
            ],
          },
        }
      );
      return res.json(createdTran);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new AuthController();
