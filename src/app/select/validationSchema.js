import { z } from "zod";

export const countrySchema = z.object({
  country: z.string().min(1, { message: "Please select a country" }),
});
