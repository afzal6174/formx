"use client";

import { cn } from "@/lib/utils/cn";
import * as React from "react";

const FormContext = React.createContext(null);

const Form = ({ action, state, dispatch, validation, className, ...props }) => {
  const id = React.useId();
  const formId = `form-${id}`;
  const formTitleId = `form-${id}-title`;
  const formDescriptionId = `form-${id}-description`;
  const formMessageId = `form-${id}-message`;

  const contextValue = {
    ...state,
    dispatch,
    validation,
    formId,
    formTitleId,
    formDescriptionId,
    formMessageId,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        id={formId}
        data-slot="form"
        action={action}
        aria-labelledby={formTitleId}
        aria-describedby={
          !state.hasErrors
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
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
  const { hasErrors, success, formTitleId } = useFormContext();
  return (
    <h2
      data-slot="form-title"
      data-error={hasErrors}
      className={cn(
        "data-[error=true]:text-destructive leading-none font-semibold",
        className
      )}
      id={formTitleId}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormContext();
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }) {
  const { success, serverMessage, formMessageId } = useFormContext();
  const body = props.children ?? (serverMessage && String(serverMessage));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        "text-sm",
        success === false && "text-destructive",
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
