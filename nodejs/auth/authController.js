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
        authuser: { user },
        apiKey: generateAccessToken(user._id, user.roles),
        expiresIn: 10 * 60 * 1000,
      });
    }
    return res.status(401).send("Login failed");
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration failed", errors });
      }
      const { userName, email, password, country, dateOfBirth } = req.body;
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

  async getUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;

      const user = await authUser.findById(decodedData.id);

      if (user) {
        return res.json({ user });
      }
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "User search failed" });
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

  async editCard(req, res) {
    try {
      const { idCard, currency, cardAmount, cardName } = req.body;
      const user = await authUser.updateOne(
        {
          "cards._id": idCard,
        },
        {
          $set: {
            "cards.$.cardAmount": cardAmount,
            "cards.$.currency": currency,
            "cards.$.cardName": cardName,
          },
        },
        { multi: true }
      );
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async editTransaction(req, res) {
    try {
      const { id } = req.params;
      const {
        idTrans,
        activity,
        paidCard,
        amount,
        date,
        payee,
        typeOfTransaction,
      } = req.body;

      const user = await authUser.updateOne(
        {
          "transaction._id": idTrans,
        },
        {
          $set: {
            "transaction.$.activity": activity,
            "transaction.$.paidCard": paidCard,
            "transaction.$.amount": amount,
            "transaction.$.date": date,
            "transaction.$.payee": payee,
            "transactions.$.typeOfTransaction": typeOfTransaction,
          },
        },
        { multi: true }
      );
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async deleteCard(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { cardName } = req.body;
      const deletedCard = await authUser.updateOne(
        { _id: `${decodedData.id}` },
        { $pull: { cards: { cardName: cardName } } }
      );
      return res.json(deletedCard);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deletedTransaction(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { paidCard } = req.body;
      const deletedTran = await authUser.updateOne(
        { _id: `${decodedData.id}` },
        { $pull: { transaction: { paidCard: paidCard } } }
      );
      return res.json(deletedTran);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteCategory(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { categoryName } = req.body;
      const deletedCategory = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        { $pull: { categories: { categoryName: categoryName } } }
      );
      return res.json(deletedCategory);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addCategory(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;

      const { categoryName, categoryType } = req.body;

      const createdCategory = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            categories: [
              {
                categoryName: categoryName,
                categoryType: categoryType,
              },
            ],
          },
        }
      );
      return res.json(createdCategory);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addCard(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;

      const { cardName, cardAmount, currency } = req.body;

      const createdCard = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
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
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;

      const { activity, paidCard, amount, date, payee, typeOfTransaction } =
        req.body;

      const createdTran = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            transaction: [
              {
                activity: `${activity}`,
                paidCard: `${paidCard}`,
                amount: amount,
                date: `${date}`,
                payee: `${payee}`,
                typeOfTransaction: `${typeOfTransaction}`,
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
