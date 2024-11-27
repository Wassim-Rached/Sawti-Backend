import mongoose from "mongoose";

// Candidate Schema
const candidateSchema = new mongoose.Schema<CandidateDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  party: { type: String, required: true },
  biography: { type: String, required: true },
  program: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

export interface CandidateInput {
  firstName: string;
  lastName: string;
  party: string;
  biography: string;
  program: string;
  profilePicture: string;
}

export interface CandidateDocument extends CandidateInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CandidateModel = mongoose.model<CandidateDocument>(
  "Candidate",
  candidateSchema
);

export default CandidateModel;
