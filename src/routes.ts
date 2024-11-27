import { Express, Response, Request } from "express";
import {
  createAccountHandler,
  getAccountByCinHandler,
  loginAccountHandler,
  updateAccountHandler,
} from "./controlers/account.controller";
import {
  createAccountSchema,
  loginSchema,
  updateAccountSchema,
} from "./schema/account.schema";
import {
  createCandidateHandler,
  getAllCandidatesHandler,
  getCandidateByIdHandler,
} from "./controlers/candidate.controller";
import { createCandidateSchema } from "./schema/candidate.schema";
import validateResource from "./middleware/ValidateResource";
import requireAccount from "./middleware/requireAccount";

function routes(app: Express) {
  app.get("", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Start Account routes
  app.post(
    "/api/accounts/register",
    validateResource(createAccountSchema),
    createAccountHandler
  );

  app.post(
    "/api/accounts/login",
    validateResource(loginSchema),
    loginAccountHandler
  );

  app.get("/api/accounts/:cin", getAccountByCinHandler);

  app.put(
    "/api/accounts/:cin",
    requireAccount,
    validateResource(updateAccountSchema),
    updateAccountHandler
  );

  // End Account routes

  // Start Candidate routes
  app.get("/api/candidates", getAllCandidatesHandler);

  app.get("/api/candidates/:candidateId", getCandidateByIdHandler);

  app.post(
    "/api/candidates",
    requireAccount,
    validateResource(createCandidateSchema),
    createCandidateHandler
  );

  // End Candidate routes
}

export default routes;
