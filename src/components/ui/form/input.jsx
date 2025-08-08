"use client";

import { cn } from "@/lib/utils/cn";
import { clearLocal, getLocal, saveLocal } from "@/lib/utils/local-storage";
import * as React from "react";
import { useFieldContext, useFormContext } from ".";

function Input({
  name: tagName,
  reset: resetTag = false,
  className,
  type = "text",
  defaultValue,
  disabled,
  ...props
}) {
  const {
    name: fieldContextName,
    reset: resetField,
    error,
    validateField,
    clearFieldError,
  } = useFieldContext();
  const fieldName = fieldContextName || tagName || "input-field";
  const { name: formContextName, success, reset: resetForm, isPending } = useFormContext();
  const formName = formContextName || "input-form";
  const reset = resetForm || resetField || resetTag;

  const STORAGE_KEY = `draft-${formName}-${fieldName}`; // userid can be added if needed

  const initialValue = defaultValue || "";
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (success) return;
    React.startTransition(async () => {
      const stored = await getLocal(STORAGE_KEY);
      if (!stored) return;
      setValue(stored);
    });
  }, []);

  React.useEffect(() => {
    if (success || reset) {
      React.startTransition(async () => {
        await clearLocal(STORAGE_KEY);
        setValue(initialValue);
      });
    }
  }, [success, reset]);

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    await saveLocal(newValue, STORAGE_KEY);
    clearFieldError();
  };

  const isDisabled = disabled || isPending;

  return (
    <input
      id={`${formName}-${fieldName}`}
      name={fieldName}
      type={type}
      data-slot="input"
      value={value}
      onChange={handleChange}
      onBlur={(e) => validateField(e.target.value)}
      disabled={isDisabled}
      autoComplete="on"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      aria-describedby={
        !error
          ? `${fieldName}-description`
          : `${fieldName}-description ${fieldName}-error`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

export { Input };
