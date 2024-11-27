import { Request, Response } from "express";
import {
  CreateAccountInput,
  LoginInput,
  UpdateAccountInput,
} from "../schema/account.schema";
import {
  createAccount,
  findAccount,
  validatePassword,
  updateAccount,
  addCandidateToFavorites,
  removeCandidateFromFavorites,
} from "../service/account.service";
import { signJwt } from "../utils/jwt.utils";
import mongoose, { ObjectId } from "mongoose";

// create account
export async function createAccountHandler(
  req: Request<{}, {}, CreateAccountInput["body"]>,
  res: Response
) {
  try {
    const account = await createAccount(req.body);
    res.send(account);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(409).send("Account Already Exists");
    return;
  }
}

// login account
export async function loginAccountHandler(
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response
) {
  try {
    // verify identity
    const isValid =
      (await validatePassword({
        cin: req.body.cin,
        pass: req.body.password,
      })) !== null;
    if (!isValid) {
      res.status(401).send("Invalid Credentials");
      return;
    }

    // generate token
    const accessToken = signJwt({ cin: req.body.cin });
    // send token
    res.send({ accessToken });
    return;
  } catch (e: any) {
    console.error(e);
    res.status(401).send("Invalid Credentials");
    return;
  }
}

// get account info by cin
export async function getAccountByCinHandler(req: Request, res: Response) {
  try {
    const cin = req.params.cin;
    const account = await findAccount({ cin });
    if (!account) {
      res.sendStatus(404);
      return;
    }
    res.send(account);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(401).send("Invalid Credentials");
    return;
  }
}

// update account by cin
export async function updateAccountHandler(
  req: Request<UpdateAccountInput["params"], {}, UpdateAccountInput["body"]>,
  res: Response
) {
  try {
    const cin = req.params.cin;
    const account = await findAccount({ cin });
    if (!account) {
      res.sendStatus(404);
      return;
    }
    const updatedAccount = await updateAccount({ cin }, req.body);
    res.send(updatedAccount);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(401).send("Invalid Credentials");
    return;
  }
}

// Add candidate to favorites
export async function addCandidateToFavoritesHandler(
  req: Request,
  res: Response
) {
  try {
    const cin = res.locals.account.cin;
    const candidateId = req.params.candidateId as unknown as ObjectId;

    const updatedFavorites = await addCandidateToFavorites(cin, candidateId);
    res.status(200).send(updatedFavorites);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}

// Remove candidate from favorites
export async function removeCandidateFromFavoritesHandler(
  req: Request,
  res: Response
) {
  try {
    const cin = res.locals.account.cin;
    const candidateId = req.params.candidateId as unknown as ObjectId;

    const updatedFavorites = await removeCandidateFromFavorites(
      cin,
      candidateId
    );
    res.status(200).send(updatedFavorites);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}
