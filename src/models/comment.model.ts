import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
  },
  { timestamps: true }
);

export interface CommentInput {
  content: string;
  account: mongoose.Schema.Types.ObjectId;
  candidate: mongoose.Schema.Types.ObjectId;
}

export interface CommentDocument extends CommentInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
