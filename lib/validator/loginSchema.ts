import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({error: "Email is required"}),
  password: z
    .string({ error: "Password is required" })
    .min(6, { error: "Password must be a mininmum of 6 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
      error:
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    }),
});
