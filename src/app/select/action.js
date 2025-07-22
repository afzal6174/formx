"use server";

import { countrySchema } from "./validationSchema";

export async function selectionAction(_prevState, formData) {
  const values = Object.fromEntries(formData);
  console.log("Form data:", values);

  const validated = countrySchema.safeParse(values);

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
