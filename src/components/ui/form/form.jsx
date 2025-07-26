"use client";

import { cn } from "@/lib/utils/cn";
import * as React from "react";

const FormContext = React.createContext(null);

const Form = ({
  name,
  action,
  state,
  reset = false,
  dispatch,
  validation,
  className,
  ...props
}) => {
  if (!name || typeof name !== "string") {
    throw new Error("A string name must be provided for <Form>");
  }

  const contextValue = {
    name,
    ...state,
    reset,
    dispatch,
    validation,
  };

  const handleSubmit = (event) => {
    if (!validation) return;

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const validated = validation.safeParse(data);
    if (validated.success) {
      dispatch({ type: "CLEAR_ERROR", payload: name });
    } else {
      event.preventDefault();
      dispatch({
        type: "SET_ERROR",
        payload: validated.error.flatten().fieldErrors,
      });
    }
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        data-slot="form"
        name={name}
        action={action}
        onSubmit={handleSubmit}
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
  return (
    context || {
      name: "",
      success: false,
      isPending: false,
      hasErrors: false,
      serverMessage: null,
      dispatch: () => {},
      validation: null,
    }
  );
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
  const { name, success, serverMessage } = useFormContext();
  const body = props.children ?? (serverMessage && String(serverMessage));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      data-error={!success}
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
