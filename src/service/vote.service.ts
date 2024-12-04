import VoteModel from "../models/vote.model";
import CandidateModel from "../models/candidate.model";
import { findAccount, updateAccount } from "./account.service";
import AccountModel from "../models/account.model";

// Cast a vote for a candidate
export async function voteForCandidate(cin: string, candidateId: string) {
  // Check if the user already voted
  const existingVote = await VoteModel.findOne({ cin });
  if (existingVote) {
    throw new Error("You have already voted.");
  }

  // Check if the candidate exists
  const candidate = await CandidateModel.findById(candidateId);
  if (!candidate) {
    throw new Error("Candidate not found.");
  }

  // Create the vote
  const vote = await VoteModel.create({ cin, candidateId });

  // Find the account associated with the vote
  const account = await findAccount({ cin });
  if (!account) {
    throw new Error("Account not found.");
  }

  // Update the account with the new vote
  const updatedAccount = await updateAccount({ cin }, { votes: vote._id });
  console.log({ updatedAccount });
  return vote;
}
