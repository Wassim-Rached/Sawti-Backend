import { object, string, TypeOf, z } from "zod";

// Zod Schema for Account
export const accountSchema = object({
  cin: string({
    required_error: "CIN is required",
  }).min(1, "CIN cannot be empty"),
  firstName: string({
    required_error: "First name is required",
  }).min(1, "First name cannot be empty"),
  lastName: string({
    required_error: "Last name is required",
  }).min(1, "Last name cannot be empty"),
  password: string({
    required_error: "Password is required",
  }).min(6, "Password too short - should be 6 chars minimum"),
  favorites: z.array(string()).optional(),
});

// Zod Schema for Create Account
export const createAccountSchema = object({
  body: object({
    cin: string({
      required_error: "CIN is required",
    }).min(1, "CIN cannot be empty"),
    firstName: string({
      required_error: "First name is required",
    }).min(1, "First name cannot be empty"),
    lastName: string({
      required_error: "Last name is required",
    }).min(1, "Last name cannot be empty"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  }),
});

// Export type for Create Account Input
export type CreateAccountInput = TypeOf<typeof createAccountSchema>;

// zod schema for login
export const loginSchema = object({
  body: object({
    cin: string({
      required_error: "CIN is required",
    }).min(1, "CIN cannot be empty"),
    password: string({
      required_error: "Password is required",
    }).min(1, "Password cannot be empty"),
  }),
});

// Export type for Login Input
export type LoginInput = TypeOf<typeof loginSchema>;

// update account schema with cin in params
export const updateAccountSchema = object({
  params: object({
    cin: string({
      required_error: "CIN is required",
    }).min(1, "CIN cannot be empty"),
  }),
  body: object({
    firstName: string({
      required_error: "First name is required",
    }).min(1, "First name cannot be empty"),
    lastName: string({
      required_error: "Last name is required",
    }).min(1, "Last name cannot be empty"),
  }),
});

// Export type for Update Account Input
export type UpdateAccountInput = TypeOf<typeof updateAccountSchema>;
