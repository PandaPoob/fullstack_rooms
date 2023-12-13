import { z } from "zod";

export const time = z
  .string({
    required_error: `Time is required`,
    invalid_type_error: `Time must be a string`,
  })
  .refine((val) => /\d{2}:\d{2}/.test(val));
