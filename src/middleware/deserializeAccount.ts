import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization || "";
  const accessToken = authorizationHeader.replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }

  res.locals.account = verifyJwt(accessToken);

  return next();
};

export default deserializeAccount;
