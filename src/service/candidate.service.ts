import { FilterQuery } from "mongoose";
import CandidateModel, {
  CandidateDocument,
  CandidateInput,
} from "../models/candidate.model";
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
