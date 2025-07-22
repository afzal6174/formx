"use client";

import { cn } from "@/lib/utils/cn";
import * as React from "react";

const FormContext = React.createContext(null);

const Form = ({
  name,
  action,
  state,
  dispatch,
  validation,
  className,
  ...props
}) => {
  if (!name) {
    throw new Error("name must be provided for <Form>");
  }
  if (typeof name !== "string") {
    throw new Error("name must be a string for <Form>");
  }
  const contextValue = {
    name,
    ...state,
    dispatch,
    validation,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        data-slot="form"
        name={name}
        action={action}
        aria-labelledby={`${name}-title`}
        aria-describedby={`${name}-description`}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {props.children}
      </form>
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used inside <Form>");
  }
  return context;
};

function FormTitle({ className, ...props }) {
  const { name, hasErrors } = useFormContext();
  return (
    <h2
      data-slot="form-title"
      data-error={hasErrors}
      className={cn(
        "data-[error=true]:text-destructive leading-none font-semibold",
        className
      )}
      id={`${name}-title`}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }) {
  const { name } = useFormContext();
  return (
    <p
      data-slot="form-description"
      id={`${name}-description`}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }) {
  const { name, hasErrors, serverMessage } = useFormContext();
  const body = props.children ?? (serverMessage && String(serverMessage));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      data-error={hasErrors}
      id={`${name}-message`}
      className={cn(
        "text-sm data-[error=true]:text-destructive ",

        className
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      {body}
    </p>
  );
}

export { Form, FormDescription, FormMessage, FormTitle, useFormContext };
