import VoteModel from "../models/vote.model";
import CandidateModel from "../models/candidate.model";

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

  return vote;
}
