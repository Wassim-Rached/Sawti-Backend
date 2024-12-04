import { Express, Response, Request } from "express";
import validateResource from "./middleware/ValidateResource";
import requireAccount from "./middleware/requireAccount";
import * as accountController from "./controlers/account.controller";
import * as accountSchema from "./schema/account.schema";
import * as candidateController from "./controlers/candidate.controller";
import * as candidateSchema from "./schema/candidate.schema";
import * as commentSchema from "./schema/comment.schema";
import * as voteController from "./controlers/vote.controller";
import * as voteSchema from "./schema/vote.schema";

function routes(app: Express) {
  app.get("", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Start Account routes
  app.post(
    "/api/accounts/register",
    validateResource(accountSchema.createAccountSchema),
    accountController.createAccountHandler
  );

  app.post(
    "/api/accounts/login",
    validateResource(accountSchema.loginSchema),
    accountController.loginAccountHandler
  );

  app.get("/api/accounts/:cin", accountController.getAccountByCinHandler);

  app.put(
    "/api/accounts/:cin",
    requireAccount,
    validateResource(accountSchema.updateAccountSchema),
    accountController.updateAccountHandler
  );

  app.post(
    "/api/accounts/:cin/favorites/:candidateId",
    requireAccount,
    accountController.addCandidateToFavoritesHandler
  );

  app.delete(
    "/api/accounts/:cin/favorites/:candidateId",
    requireAccount,
    accountController.removeCandidateFromFavoritesHandler
  );

  // End Account routes

  // Start Candidate routes
  app.get("/api/candidates", candidateController.getAllCandidatesHandler);

  app.get(
    "/api/candidates/:candidateId",
    candidateController.getCandidateByIdHandler
  );

  app.post(
    "/api/candidates",
    requireAccount,
    validateResource(candidateSchema.createCandidateSchema),
    candidateController.createCandidateHandler
  );

  app.get(
    "/api/candidates/:candidateId/votes",
    candidateController.getVotesByCandidateIdHandler
  );

  app.get(
    "/api/candidates/:candidateId/comments",
    candidateController.getCommentsForCandidateHandler
  );

  app.post(
    "/api/candidates/:candidateId/comments",
    requireAccount,
    validateResource(commentSchema.createCommentSchema),
    candidateController.addCommentHandler
  );

  app.delete(
    "/api/candidates/:candidateId/comments/:commentId",
    requireAccount,
    candidateController.removeCommentHandler
  );

  // End Candidate routes

  // Start Vote routes
  app.post(
    "/api/votes",
    requireAccount,
    validateResource(voteSchema.createVoteSchema),
    voteController.voteForCandidateHandler
  );

  // End Vote routes
}

export default routes;
