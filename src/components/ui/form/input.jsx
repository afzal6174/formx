"use client";

import { cn } from "@/lib/utils/cn";
import { clearLocal, getLocal, saveLocal } from "@/lib/utils/localStorage";
import * as React from "react";
import { useFormContext } from ".";
import { useFieldContext } from "./field";

function Input({
  className,
  type = "text",
  defaultValue,
  validation,
  ...props
}) {
  const {
    name,
    error,
    fieldId,
    fieldDescriptionId,
    fieldMessageId,
    validateField,
    clearFieldError,
  } = useFieldContext();
  const { success, formId } = useFormContext();

  const STORAGE_KEY = `draft-${formId}-${name}-${fieldId}`; // userid can be added if needed
  const [value, setValue] = React.useState(defaultValue || "");

  React.useEffect(() => {
    if (success) return;
    React.startTransition(async () => {
      const stored = await getLocal(STORAGE_KEY);
      if (!stored) return;
      setValue(stored);
    });
  }, [STORAGE_KEY, success]);

  React.useEffect(() => {
    if (success) {
      React.startTransition(async () => {
        await clearLocal(STORAGE_KEY);
        setValue("");
      });
    }
  }, [success, STORAGE_KEY]);

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    await saveLocal(newValue, STORAGE_KEY);
    clearFieldError();
  };

  return (
    <input
      id={fieldId}
      name={name}
      type={type}
      data-slot="input"
      value={value}
      onChange={handleChange}
      onBlur={(e) => validateField(e.target.value)}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      aria-describedby={
        !error
          ? `${fieldDescriptionId}`
          : `${fieldDescriptionId} ${fieldMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

export { Input };
