"use client";

import { cn } from "@/lib/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { useFormContext } from "./form";

const FieldContext = React.createContext(null);

const Field = ({
  name,
  validation: fieldValidation,
  reset = false,
  className,
  ...props
}) => {
  if (!name || typeof name !== "string") {
    throw new Error("A string name must be provided for <Field>");
  }

  const { errors, dispatch, validation: formValidation } = useFormContext();

  const error = errors?.[name]?.[0];

  const validationRule =
    fieldValidation || formValidation?.pick({ [name]: true });

  const validateField = (fieldValue) => {
    if (!validationRule) return;
    const validated = validationRule.safeParse({ [name]: fieldValue });

    if (validated.success) {
      dispatch({ type: "CLEAR_ERROR", payload: name });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: validated.error.flatten().fieldErrors,
      });
    }
  };

  const clearFieldError = () => {
    dispatch({ type: "CLEAR_ERROR", payload: name });
  };

  return (
    <FieldContext.Provider
      value={{
        name,
        error,
        validateField,
        clearFieldError,
      }}
    >
      <div
        name={name}
        data-slot="form-field"
        aria-labelledby={`${name}-label`}
        aria-describedby={`${name}-description`}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
};

const useFieldContext = () => {
  const fieldContext = React.useContext(FieldContext);

  return (
    fieldContext || {
      name: null,
      error: null,
      validateField: () => {},
      clearFieldError: () => {},
    }
  );
};

function FieldLabel({ className, ...props }) {
  const { name: fieldName, error } = useFieldContext();
  const { name: formName } = useFormContext();
  return (
    <LabelPrimitive.Root
      id={`${formName}-${fieldName}-label`}
      htmlFor={`${formName}-${fieldName}`}
      data-slot="label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-destructive flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }) {
  const { name: fieldName } = useFieldContext();
  const { name: formName } = useFormContext();
  return (
    <p
      data-slot="form-description"
      id={`${formName}-${fieldName}-description`}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }) {
  const { name: fieldName, error } = useFieldContext();
  const { name: formName } = useFormContext();

  const body = props.children ?? (error && String(error));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="field-error"
      id={`${formName}-${fieldName}-error`}
      className={cn("text-destructive text-sm", className)}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      {body}
    </p>
  );
}

export { Field, FieldDescription, FieldError, FieldLabel, useFieldContext };
