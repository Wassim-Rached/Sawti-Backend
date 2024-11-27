import { Request, Response } from "express";
import { CreateCandidateInput } from "../schema/candidate.schema";
import {
  createCandidate,
  findCandidate,
  getAllCandidates,
} from "../service/candidate.service";

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
