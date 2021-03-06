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
  return jwt.sign(payload, process.env.secret, { expiresIn: "2h" });
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
        expiresIn: 30 * 60 * 1000,
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
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { id } = req.params;
      const { card } = req.body;
      const user = await authUser.updateOne(
        {
          _id: `${decodedData.id}`,
          "cards._id": id,
        },
        {
          $set: {
            "cards.$.cardAmount": card.cardAmount,
            "cards.$.currency": card.currency,
            "cards.$.cardName": card.cardName,
            "cards.$.description": card.description,
          },
        },
        { multi: true }
      );
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Card edition failed" });
    }
  }
  async editCategory(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { id } = req.params;
      const { category } = req.body;
      const user = await authUser.updateOne(
        {
          _id: `${decodedData.id}`,
          "categories._id": id,
        },
        {
          $set: {
            "categories.$.cardId": category.cardId,
            "categories.$.categoryName": category.categoryName,
            "categories.$.categoryType": category.categoryType,
          },
        },
        { multi: true }
      );
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Category edition failed" });
    }
  }

  async editTransaction(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { id } = req.params;
      const { transaction } = req.body;

      const user = await authUser.updateOne(
        {
          _id: `${decodedData.id}`,
          "transaction._id": id,
        },
        {
          $set: {
            "transaction.$.activity": transaction.activity,
            "transaction.$.title": transaction.title,
            "transaction.$.description": transaction.description,
            "transaction.$.paidCard": transaction.paidCard,
            "transaction.$.amount": transaction.amount,
            "transaction.$.date": transaction.date,
            "transaction.$.payee": transaction.payee,
            "transactions.$.typeOfTransaction": transaction.typeOfTransaction,
          },
        },
        { multi: true }
      );
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Transaction edition failed" });
    }
  }

  async deleteCard(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { id } = req.params;
      const deletedCard = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        { $pull: { cards: { _id: id } } }
      );
      return res.json(deletedCard);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deletedTransaction(req, res) {
    try {
      let state = {
        type: "",
        amount: 0,
        paidCard: "",
      };
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;
      const { id } = req.params;

      const amountOfTrans = await authUser.findOne(
        {
          _id: decodedData.id,
          "transaction._id": id,
        },
        {
          "transaction.$": 1,
        }
      );

      state.amount = amountOfTrans.transaction[0].amount;
      state.type = amountOfTrans.transaction[0].typeOfTransaction;
      state.paidCard = amountOfTrans.transaction[0].paidCard;

      const deletedTran = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        { $pull: { transaction: { _id: id } } }
      );

      if (state.type === "expense") {
        const tempData = await authUser.updateOne(
          {
            _id: `${decodedData.id}`,
            "cards._id": state.paidCard,
          },
          {
            $inc: {
              "cards.$.cardAmount": state.amount,
            },
          }
        );
      }

      if (state.type === "income") {
        const tempData = await authUser.updateOne(
          {
            _id: `${decodedData.id}`,
            "cards._id": state.paidCard,
          },
          {
            $inc: {
              "cards.$.cardAmount": -state.amount,
            },
          }
        );
      }
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
      const { id } = req.params;
      const deletedCategory = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        { $pull: { categories: { _id: id } } }
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

      const { cardId, categoryName, categoryType } = req.body;

      const createdCategory = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            categories: [
              {
                cardId: cardId,
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

      const { cardName, cardAmount, currency, description } = req.body;

      const createdCard = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            cards: [
              {
                cardName: `${cardName}`,
                currency: `${currency}`,
                cardAmount: cardAmount,
                description: `${description}`,
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
        return res.status(403).json({ message: "User is not authorized1" });
      }
      const decodedData = jwt.verify(token, process.env.secret);
      req.authUser = decodedData;

      const {
        paidCard,
        activity,
        description,
        amount,
        date,
        payee,
        typeOfTransaction,
        title,
      } = req.body;

      const createdTran = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            transaction: [
              {
                activity: `${activity}`,
                title: `${title}`,
                description: `${description}`,
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

      const createdCategory = await authUser.findOneAndUpdate(
        { _id: `${decodedData.id}` },
        {
          $addToSet: {
            categories: [
              {
                cardId: paidCard,
                categoryName: activity,
                categoryType: typeOfTransaction,
              },
            ],
          },
        }
      );

      let editCard;

      if (typeOfTransaction === "income") {
        editCard = await authUser.updateOne(
          {
            _id: `${decodedData.id}`,
            "cards._id": paidCard,
          },
          {
            $inc: {
              "cards.$.cardAmount": amount,
            },
          }
        );
      }

      if (typeOfTransaction === "expense") {
        editCard = await authUser.updateOne(
          {
            _id: `${decodedData.id}`,
            "cards._id": paidCard,
          },
          {
            $inc: {
              "cards.$.cardAmount": -amount,
            },
          }
        );
      }
      const obj = { createdTran, editCard, createdCategory };
      return res.status(200).json(obj);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new AuthController();
