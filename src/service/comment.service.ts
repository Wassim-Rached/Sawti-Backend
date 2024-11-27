import CommentModel from "../models/comment.model";
import mongoose from "mongoose";
import AccountModel from "../models/account.model";

// Service function to add a comment
export async function addCommentOnCandidate(
  content: string,
  cin: string,
  candidateId: mongoose.Schema.Types.ObjectId
) {
  const account = await AccountModel.findOne({ cin });

  if (!account) {
    throw new Error("Account not found.");
  }

  const comment = await CommentModel.create({
    content,
    account: account._id,
    candidate: candidateId,
  });

  return comment;
}

// Service function to remove a comment
export async function removeCommentFromCandidate(
  commentId: mongoose.Schema.Types.ObjectId
) {
  const comment = await CommentModel.findByIdAndDelete(commentId);

  if (!comment) {
    throw new Error("Comment not found.");
  }

  return comment;
}

// Service function to get all comments for a specific candidate
export async function getCommentsForCandidate(
  candidateId: mongoose.Schema.Types.ObjectId
) {
  return CommentModel.find({ candidate: candidateId })
    .populate("account")
    .sort({ createdAt: -1 });
}
