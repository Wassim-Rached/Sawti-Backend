import { Request, Response } from "express";
import { CreateCandidateInput } from "../schema/candidate.schema";
import {
  createCandidate,
  findCandidate,
  getAllCandidates,
  getVoteCountByCandidateId,
} from "../service/candidate.service";
import {
  addCommentOnCandidate,
  getCommentsForCandidate,
  removeCommentFromCandidate,
} from "../service/comment.service";
import { ObjectId } from "mongoose";

// create candidate
export async function createCandidateHandler(
  req: Request<{}, {}, CreateCandidateInput["body"]>,
  res: Response
) {
  try {
    const candidate = await createCandidate(req.body);
    res.status(201).send(candidate);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(409).send("Candidate Already Exists");
    return;
  }
}

// get candidate by id
export async function getCandidateByIdHandler(
  req: Request<{ candidateId: string }>,
  res: Response
) {
  try {
    const { candidateId } = req.params;
    const candidate = await findCandidate({ _id: candidateId });
    if (!candidate) {
      res.sendStatus(404);
      return;
    }
    res.send(candidate);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(500).send("Error retrieving candidate");
    return;
  }
}

// get all candidates
export async function getAllCandidatesHandler(req: Request, res: Response) {
  try {
    const candidates = await getAllCandidates();
    res.send(candidates);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(500).send("Error retrieving candidates");
    return;
  }
}

// Add a comment
export async function addCommentHandler(req: Request, res: Response) {
  try {
    const { content } = req.body;
    const candidateId = req.params.candidateId as unknown as ObjectId;
    const { cin } = res.locals.account;

    const comment = await addCommentOnCandidate(content, cin, candidateId);
    res.status(201).send(comment);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}

// Remove a comment
export async function removeCommentHandler(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId as unknown as ObjectId;

    await removeCommentFromCandidate(commentId);
    res.sendStatus(204);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}

// Get all comments for a candidate
export async function getCommentsForCandidateHandler(
  req: Request,
  res: Response
) {
  try {
    const candidateId = req.params.candidateId as unknown as ObjectId;

    const comments = await getCommentsForCandidate(candidateId);
    res.status(200).send(comments);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
}

// get total votes for candidate
export async function getVotesByCandidateIdHandler(
  req: Request,
  res: Response
) {
  try {
    const candidateId = req.params.candidateId;

    const voteCount = await getVoteCountByCandidateId(candidateId);

    res.send({ candidateId, voteCount });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching vote count for the candidate");
  }
}
