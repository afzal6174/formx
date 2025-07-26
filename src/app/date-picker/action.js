"use server";

import { dateTimeSchema } from "./validation-schema";

export async function dateTimeAction(_prevState, formData) {
  const data = Object.fromEntries(formData);

  const validated = dateTimeSchema.safeParse(data);

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
