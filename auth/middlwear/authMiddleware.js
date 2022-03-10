import jwt from "jsonwebtoken";
import secret from "dotenv/config";

export const authMiddleware = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: " User is not authorized1" });
    }
    const decodedData = jwt.verify(token, process.env.secret);
    req.authUser = decodedData;
    next();
  } catch (e) {
    return res.status(403).json({ message: " User is not authorized2" });
  }
};
