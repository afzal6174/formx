"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DatePicker,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  FormMessage,
  FormTitle,
} from "@/components/ui/form";
import useFormAction from "@/lib/hooks/use-form-action";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { dateTimeAction } from "./action";
import { dateTimeSchema } from "./validation-schema";

export default function LoginForm() {
  const [states, dispatch, formAction] = useFormAction(dateTimeAction);

  const router = useRouter();

  useEffect(() => {
    if (states.success) {
      router.push("/");
    }
  }, [states.success]);

  const bookedDates = Array.from(
    { length: 12 },
    (_, i) => new Date(2025, 8, 15 + i)
  );

  return (
    <div className="flex items-center justify-center h-full max-container">
      <Card className="w-full max-w-sm">
        <Form
          name="date-picker"
          action={formAction}
          state={states}
          dispatch={dispatch}
          validation={dateTimeSchema}
        >
          <CardHeader>
            <FormTitle>Test DatePicker Component</FormTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Field name="dob">
                <FieldLabel>Date of Birth</FieldLabel>
                <FieldDescription>Set your date of birth</FieldDescription>
                <DatePicker
                  mode="single"
                  defaultMonth="18 years ago"
                  placeholder="Select your date of birth"
                  captionLayout="dropdown"
                  disabledDates={{
                    after: new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    ),
                    before: new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    ),
                  }}
                />
                <FieldError />
              </Field>

              <Field name="booking">
                <FieldLabel>Book your Room</FieldLabel>
                <FieldDescription>Set your booking date</FieldDescription>
                <DatePicker
                  mode="range"
                  placeholder="Select your booking date"
                  numberOfMonths={2}
                  min={1}
                  max={30}
                  startMonth={new Date()}
                  // endMonth={
                  //   new Date(
                  //     new Date().setFullYear(new Date().getFullYear() + 1)
                  //   )
                  // } // don't use this as it will break the date picker
                  disabledDates={[
                    bookedDates,
                    {
                      before: new Date(),
                      after: new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1)
                      ),
                    },
                  ]}
                  modifiers={{
                    booked: bookedDates,
                  }}
                  modifiersClassNames={{
                    booked: "[&>button]:line-through opacity-100",
                  }}
                />
                <FieldError />
              </Field>

              <Field name="booking-multiple">
                <FieldLabel>Book your Venue</FieldLabel>
                <FieldDescription>Set your booking date</FieldDescription>
                <DatePicker
                  mode="multiple"
                  placeholder="Select your booking date"
                  max={5}
                  startMonth={new Date()}
                  disabledDates={[
                    { dayOfWeek: [5, 6] },
                    {
                      before: new Date(),
                      after: new Date(
                        new Date().setMonth(new Date().getMonth() + 1)
                      ),
                    },
                  ]}

                  // disableNavigation
                />
                <FieldError />
              </Field>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2">
            <Button
              type="submit"
              disabled={states.isPending || states.hasErrors}
              className="w-full"
            >
              {states.isPending ? "Booking..." : "Book"}
            </Button>

            <FormMessage />
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
