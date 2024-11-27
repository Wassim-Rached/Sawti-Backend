import mongoose from "mongoose";

// Results Schema
const resultsSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  totalVotes: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

// Results Model
const Results = mongoose.model("Results", resultsSchema);

export default Results;
