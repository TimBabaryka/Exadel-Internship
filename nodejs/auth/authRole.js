import mongoose from "mongoose";

const authRole = new mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
});

export default mongoose.model("AuthRole", authRole);
