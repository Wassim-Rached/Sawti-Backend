import { object, string, TypeOf } from "zod";

// Zod Schema for Comment
export const createCommentSchema = object({
  body: object({
    content: string({
      required_error: "Content is required",
    }).min(1, "Content cannot be empty"),
  }),
});

// Export type for Create Comment Input
export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
