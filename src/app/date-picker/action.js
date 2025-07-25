"use server";

import { dateTimeSchema } from "./validation-schema";

export async function dateTimeAction(_prevState, formData) {
  const values = Object.fromEntries(formData);
  console.log("Form data:", values);

  const validated = dateTimeSchema.safeParse(values);
  console.log("Validation result:", validated);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
      message: "Failed! Please provide valid date and time.",
    };
  }

  // Success
  console.log("Validated data:", validated.data);
  return { success: true, message: "successfully sending date and time!" };
}
