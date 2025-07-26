"use server";

import { loginSchema } from "./validation-schema";

export async function loginAction(_prevState, formData) {
  const data = Object.fromEntries(formData);

  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
      message: "Failed! Please provide valid email and password.",
    };
  }

  // Success
  console.log("Validated data:", validated.data);
  return { success: true, message: "Login successful!" };
}
