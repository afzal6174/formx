"use server";

import { countrySchema } from "./validationSchema";

export async function selectionAction(_prevState, formData) {
  const values = Object.fromEntries(formData);
  console.log("country values:", values); // got "country values: { country: 'us' }" when value is "" in select.jsx

  const validated = countrySchema.safeParse(values);
  console.log("country validation: ", validated);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    console.log("country error: ", errors);

    return {
      success: false,
      errors,
      message: "Failed! Please provide valid email and password.",
    };
  }

  // Success
  return { success: true, message: "Login successful!" };
}
