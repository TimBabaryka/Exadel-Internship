import mongoose from "mongoose";

const categoryName = new mongoose.Schema({
  cardId: { type: String, required: true },
  categoryName: { type: String, required: true },
  categoryType: { type: String, required: true },
});

const transactionSchema = new mongoose.Schema(
  {
    activity: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    paidCard: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    payee: { required: true, type: String },
    typeOfTransaction: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const cardSchema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardAmount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const authUser = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  cards: [cardSchema],
  transaction: [transactionSchema],
  categories: [categoryName],
});

export default mongoose.model("AuthUser", authUser);
