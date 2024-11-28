import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/http-response.js';

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error("AUTH_NOT_FOUND");

    const auth = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET, (err, decodedData) => {
      if (err) {
        return res.status(403).json({ status: 403, message: "Invalid Token" });
      }
      else {
        req.user = decodedData;
        next();
      }
    });


  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res.status(401).json({ status: 401, message: err.message });

    if (err.name === "TokenExpiredError")
      return res.status(401).json({ status: 401, message: err.message });

    errorResponse(res, err);
  }
};

export { verifyToken };
