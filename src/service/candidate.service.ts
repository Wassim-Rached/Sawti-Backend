import { FilterQuery } from "mongoose";
import VoteModel from "../models/vote.model";
import CandidateModel, { CandidateDocument } from "../models/candidate.model";
import { CreateCandidateInput } from "../schema/candidate.schema";

// create candidate
export async function createCandidate(input: CreateCandidateInput["body"]) {
  try {
    const candidate = await CandidateModel.create(input);
    return candidate;
  } catch (e: any) {
    throw new Error(e);
  }
}

// find candidate
export async function findCandidate(query: FilterQuery<CandidateDocument>) {
  return CandidateModel.findOne(query).lean();
}

// get all candidates
export async function getAllCandidates() {
  return CandidateModel.find().lean();
}

// get total votes
export async function getVoteCountByCandidateId(candidateId: string) {
  try {
    // Count the number of votes for the specific candidate
    const voteCount = await VoteModel.countDocuments({ candidateId });
    return voteCount;
  } catch (e) {
    console.error(e);
    throw new Error("Error counting votes");
  }
}
