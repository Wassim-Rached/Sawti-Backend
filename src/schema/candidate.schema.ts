import { object, string, TypeOf, z } from "zod";

// Zod Schema for Candidate
export const candidateSchema = object({
  firstName: string({
    required_error: "First name is required",
  }).min(1, "First name cannot be empty"),
  lastName: string({
    required_error: "Last name is required",
  }).min(1, "Last name cannot be empty"),
  party: string({
    required_error: "Party is required",
  }).min(1, "Party cannot be empty"),
  biography: string({
    required_error: "Biography is required",
  }).min(1, "Biography cannot be empty"),
  program: string({
    required_error: "Program is required",
  }).min(1, "Program cannot be empty"),
  profilePicture: string().optional(),
  // Add other fields like vote count, etc. if needed
});

// Zod Schema for Create Candidate
export const createCandidateSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }).min(1, "First name cannot be empty"),
    lastName: string({
      required_error: "Last name is required",
    }).min(1, "Last name cannot be empty"),
    party: string({
      required_error: "Party is required",
    }).min(1, "Party cannot be empty"),
    biography: string({
      required_error: "Biography is required",
    }).min(1, "Biography cannot be empty"),
    program: string({
      required_error: "Program is required",
    }).min(1, "Program cannot be empty"),
    profilePicture: string().optional(),
  }),
});

// Export type for Create Candidate Input
export type CreateCandidateInput = TypeOf<typeof createCandidateSchema>;
