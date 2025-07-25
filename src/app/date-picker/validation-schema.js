import { dateParser } from "@/lib/utils/date-parser";
import { z } from "zod";

export const dateTimeSchema = z.object({
  dob: z.preprocess(
    (value) => dateParser(value, "single"),
    z
      .date({
        required_error: "Date of birth is required",
        invalid_type_error: "Please provide a valid date of birth",
      })
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      )
      .min(
        new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
        "Date of birth cannot be more than 100 years ago"
      )
  ),

  booking: z.preprocess(
    (value) => dateParser(value, "range") || { from: undefined, to: undefined },
    z
      .object({
        from: z.date({
          required_error: "Start date is required",
          invalid_type_error: "Start date must be a valid date",
        }),
        to: z.date({
          required_error: "End date is required",
          invalid_type_error: "End date must be a valid date",
        }),
      })
      .refine((value) => value.from <= value.to, {
        message: "Start date must be before end date",
        path: ["to"],
      })
      .refine(
        (value) =>
          (value.to.getTime() - value.from.getTime()) / (1000 * 60 * 60 * 24) <=
          30,
        {
          message: `Booking cannot be more than ${30} days`,
          path: ["to"],
        }
      )
  ),

  "booking-multiple": z.preprocess(
    (value) => dateParser(value, "multiple") || [],
    z
      .array(z.date({ required_error: "Please select a valid date" }))
      .min(1, "You must select at least one date")
      .max(5, "You can select up to 5 dates")
  ),
});
