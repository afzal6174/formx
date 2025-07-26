"use server";

import { countrySchema } from "./validation-schema";

export async function selectionAction(_prevState, formData) {
  const data = Object.fromEntries(formData);

  const validated = countrySchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
      message: "Failed! Please provide valid country.",
    };
  }

  // Success
  console.log("Validated data:", validated.data);
  return { success: true, message: "Send country successfully!" };
}
