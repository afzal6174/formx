"use client";

import { cn } from "@/lib/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { useFormContext } from "./form";

const FieldContext = React.createContext(null);

const Field = ({ name, validation: fieldValidation, className, ...props }) => {
  const id = React.useId();
  const { errors, dispatch, validation: formValidation } = useFormContext();

  const error = errors?.[name]?.[0];

  const validationRule =
    fieldValidation || formValidation?.pick({ [name]: true });

  const validateField = (fieldValue) => {
    if (!validationRule) return;
    const result = validationRule.safeParse({ [name]: fieldValue });

    if (result.success) {
      dispatch({ type: "CLEAR_ERROR", payload: name });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: result.error.flatten().fieldErrors,
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
        fieldId: `field-${id}`,
        fieldDescriptionId: `field-${id}-description`,
        fieldMessageId: `field-${id}-message`,
        validateField,
        clearFieldError,
      }}
    >
      <div
        data-slot="form-field"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
};

const useFieldContext = () => {
  const fieldContext = React.useContext(FieldContext);

  if (!fieldContext) {
    throw new Error("useFieldContext should be used within <Field>");
  }

  return fieldContext;
};

function FieldLabel({ className, ...props }) {
  const { error, fieldId } = useFieldContext();
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-destructive flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      htmlFor={fieldId}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }) {
  const { fieldDescriptionId } = useFieldContext();
  return (
    <p
      data-slot="form-description"
      id={fieldDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FieldMessage({ className, ...props }) {
  const { error, fieldMessageId } = useFieldContext();
  const body = props.children ?? (error && String(error));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={fieldMessageId}
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

export { Field, FieldDescription, FieldLabel, FieldMessage, useFieldContext };
