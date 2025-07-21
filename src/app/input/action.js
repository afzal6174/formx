"use server";

import { loginSchema } from "./validationSchema";

export async function loginAction(_prevState, formData) {
  const values = Object.fromEntries(formData);
  console.log("Login values:", values);

  const validated = loginSchema.safeParse(values);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
      message: "Failed! Please provide valid email and password.",
    };
  }

  // Success
  return { success: true, message: "Login successful!" };
}
