import mongoose from "mongoose";



// const transactionSchema = new mongoose.Schema(
//   {
//     activity: { type: String, required: true },
//     amount: { type: Number, required: true },
//     status:{required:true,type:String},
//     date: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const cardSchema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardAmount: { type: Number, required: true },
    currency: { type: String, required: true },
    transaction:[Object]
  },
  {
    timestamps: true,
  }
);

const authUser = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  cards: [cardSchema],
});

export default mongoose.model("AuthUser", authUser);
