import { z } from "zod";

export const date = z.string().refine((val) => /\d{2}-\d{2}-\d{2}/.test(val));
