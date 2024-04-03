import jwt from "jsonwebtoken";
export const AuthMiddleware = async (req, res, next) => {
  try {
    const Authorization = req.headers.authorization;

    if (!Authorization) {
      return res.status(401).send("Access denied");
    }
    const token = Authorization.split(" ")[1];
    console.log(token);

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      res.User = user;
      next();
    }
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
