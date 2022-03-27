import jwt from "jsonwebtoken";
import secret from "dotenv/config";

export const roleMiddleware = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: " User is not authorized1" });
      }
      const { roles: userRoles } = jwt.verify(token, process.env.secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res
          .status(403)
          .json({ message: " You have no access to this data" });
      }
      next();
    } catch (e) {
      return res
        .status(403)
        .json({ message: " You have no access to this data" });
    }
  };
};
