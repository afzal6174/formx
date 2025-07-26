"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils/cn";
import { dateFormatter } from "@/lib/utils/date-formatter";
import { dateParser } from "@/lib/utils/date-parser";
import { clearLocal, getLocal, saveLocal } from "@/lib/utils/local-storage";
import { useFieldContext, useFormContext } from ".";

export function DatePicker({
  name: tagName,
  reset: resetTag = false,
  placeholder,
  defaultValue,
  defaultMonth,
  numberOfMonths: popoverNumberOfMonths = 1,
  mode = "single",
  className,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const initialValue = dateParser(defaultValue, mode);
  const [date, setDate] = React.useState(initialValue);
  const [month, setMonth] = React.useState(
    dateParser(defaultMonth, mode) || date || new Date()
  );

  const {
    name: fieldContextName,
    reset: resetField,
    error,
    validateField,
    clearFieldError,
  } = useFieldContext();
  const fieldName = fieldContextName || tagName || "date-picker";
  const { name: formContextName, success, reset: resetForm } = useFormContext();
  const formName = formContextName || "dp-form";
  const reset = resetForm || resetField || resetTag;

  const STORAGE_KEY = `draft-${formName}-${fieldName}`; // userid can be added if needed

  const drawerButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (success) return;
    React.startTransition(async () => {
      const stored = await getLocal(STORAGE_KEY);
      if (!stored) return;
      setDate(stored);
    });
  }, []);

  React.useEffect(() => {
    if (success || reset) {
      React.startTransition(async () => {
        await clearLocal(STORAGE_KEY);
        setDate(initialValue);
      });
    }
  }, [success, reset]);

  React.useEffect(() => {
    if (openMobile) {
      drawerButtonRef.current?.blur();
    }
  }, [openMobile]);

  const handleSelect = async (date) => {
    setDate(dateParser(date, mode));
    await saveLocal(dateParser(date, mode), STORAGE_KEY);
    clearFieldError();
  };

  if (isMobile) {
    return (
      <Drawer
        open={openMobile}
        onOpenChange={(open) => {
          setOpenMobile(open);
          if (!open) {
            validateField(date);
          }
        }}
      >
        <DrawerTrigger asChild>
          <Button
            ref={drawerButtonRef}
            id={`${formName}-${fieldName}`}
            data-slot="date-picker"
            data-has-value={!!date}
            variant="outline"
            aria-describedby={
              !error
                ? `${fieldName}-description`
                : `${fieldName}-description ${fieldName}-error`
            }
            aria-invalid={!!error}
            className={cn(
              "w-full min-w-0 justify-between", // min-w-0 should be added in button component
              "data-[has-value=false]:text-muted-foreground font-normal"
            )}
          >
            <input
              hidden
              name={fieldName}
              value={date ? JSON.stringify(date) : ""}
              readOnly
            />

            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {dateFormatter(date, mode) || placeholder || "Select date"}
            </span>

            <CalendarIcon className="size-3.5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-auto overflow-hidden p-0">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Select date</DrawerTitle>
            <DrawerDescription>Set your date</DrawerDescription>
          </DrawerHeader>
          <div className="mt-4 border-t">
            <Calendar
              mode={mode}
              selected={date}
              month={month}
              numberOfMonths={1}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              className={cn(
                "mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),52px)]",
                className
              )}
              {...props}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          validateField(date);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={`${formName}-${fieldName}`}
          data-slot="date-picker"
          data-has-value={!!date}
          variant="outline"
          aria-describedby={
            !error
              ? `${fieldName}-description`
              : `${fieldName}-description ${fieldName}-error`
          }
          aria-invalid={!!error}
          className={cn(
            "w-full min-w-0 justify-between",
            "data-[has-value=false]:text-muted-foreground font-normal"
          )}
        >
          <input
            hidden
            name={fieldName}
            value={date ? JSON.stringify(date) : ""}
            readOnly
          />

          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {dateFormatter(date, mode) || placeholder || "Select date"}
          </span>

          <CalendarIcon className="size-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode={mode}
          name={fieldName}
          selected={date}
          month={month}
          numberOfMonths={popoverNumberOfMonths}
          onMonthChange={setMonth}
          onSelect={handleSelect}
          className={cn(
            "rounded-lg border md:[--cell-size:--spacing(7)] 2xl:[--cell-size:--spacing(9)]",
            className
          )}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
