"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
  Input,
} from "@/components/ui/form";
import useFormAction from "@/lib/hooks/useFormAction";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginAction } from "./action";
import { loginSchema } from "./validationSchema";

export default function LoginForm() {
  const [states, dispatch, formAction] = useFormAction(loginAction);

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (states.success) {
      router.push("/");
    }
  }, [states.success]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <Form
          action={formAction}
          state={states}
          dispatch={dispatch}
          validation={loginSchema}
        >
          <CardHeader>
            <FormTitle>Login to your account</FormTitle>
            <FormDescription>
              Enter your email below to login to your account
            </FormDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Field name="email" className="grid gap-2">
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="example@email.com" />
                <FieldMessage />
              </Field>

              <Field name="password" className="grid gap-2">
                <div className="flex items-center">
                  <FieldLabel>Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="********"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setVisible((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto w-auto"
                    tabIndex={-1}
                  >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
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
              {states.isPending ? "Logging..." : "Login"}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
            <FormMessage />
          </CardFooter>
        </Form>
      </Card>
    </main>
  );
}
