import mongoose from "mongoose";

// Vote Schema
const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  votedAt: { type: Date, default: Date.now },
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
