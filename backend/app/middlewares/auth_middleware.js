export const AuthMiddleware = async (req, res, next) => {
  const { autorization } = req.headers;
  const token = autorization.split(" ")[1];
  if (!token) {
    next();
  }
};
