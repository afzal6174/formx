"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldMessage,
  Form,
  FormDescription,
  FormMessage,
  FormTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form";
import useFormAction from "@/lib/hooks/useFormAction";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectionAction } from "./action";
import { countrySchema } from "./validationSchema";

export default function LoginForm() {
  const [states, dispatch, formAction] = useFormAction(selectionAction);

  const router = useRouter();

  useEffect(() => {
    if (states.success) {
      router.push("/");
    }
  }, [states.success]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <Form action={formAction} state={states} dispatch={dispatch}>
          <CardHeader>
            <FormTitle>Select your country</FormTitle>
            <FormDescription>
              Choose your country from the list below
            </FormDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Field name="country" validation={countrySchema}>
                <FieldLabel>Country</FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "us", label: "United States" },
                      { value: "ca", label: "Canada" },
                      { value: "uk", label: "United Kingdom" },
                    ].map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldMessage />
              </Field>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              disabled={states.isPending || states.hasErrors}
              className="w-full"
            >
              {states.isPending ? "Sending..." : "Send"}
            </Button>

            <FormMessage />
          </CardFooter>
        </Form>
      </Card>
    </main>
  );
}
