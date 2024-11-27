import { Request, Response, NextFunction } from "express";

const requireAccount = (req: Request, res: Response, next: NextFunction) => {
  const account = res.locals.account;

  if (!account) {
    res.sendStatus(403);
    return;
  }

  return next();
};

export default requireAccount;
