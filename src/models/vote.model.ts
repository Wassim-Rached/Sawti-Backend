import mongoose from "mongoose";

// Vote Schema
const voteSchema = new mongoose.Schema<VoteDocument>({
  cin: { type: String, required: true, ref: "Account", unique: true },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
});

export interface VoteInput {
  cin: string;
  candidateId: mongoose.Schema.Types.ObjectId;
}

export interface VoteDocument extends VoteInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const VoteModel = mongoose.model<VoteDocument>("Vote", voteSchema);

export default VoteModel;
