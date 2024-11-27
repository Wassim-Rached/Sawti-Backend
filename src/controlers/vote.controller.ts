import { Request, Response } from "express";
import { CreateVoteInput } from "../schema/vote.schema";
import { voteForCandidate } from "../service/vote.service";

// Vote for a candidate
export async function voteForCandidateHandler(
  req: Request<{}, {}, CreateVoteInput["body"]>,
  res: Response
) {
  try {
    const { candidateId } = req.body;
    const cin = res.locals.account.cin;

    // Call the service to vote for the candidate
    const vote = await voteForCandidate(cin, candidateId);
    res.status(200).send(vote);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}
