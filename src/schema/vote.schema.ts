import { object, string, TypeOf, z } from "zod";

// Zod Schema for Vote
export const voteSchema = object({
  cin: string({
    required_error: "CIN is required",
  }).min(1, "CIN cannot be empty"),
  candidateId: string({
    required_error: "Candidate ID is required",
  }).min(1, "Candidate ID cannot be empty"),
});

// Zod Schema for Vote input (create a vote)
export const createVoteSchema = object({
  body: object({
    candidateId: string({
      required_error: "Candidate ID is required",
    }).min(1, "Candidate ID cannot be empty"),
  }),
});

// Export type for Vote Input
export type CreateVoteInput = TypeOf<typeof createVoteSchema>;
