import { formatDateRange } from "little-date";

type DateValue = Date | { from?: Date; to?: Date } | Date[] | undefined;

export function dateFormatter(
  value: DateValue,
  mode: "single" | "range" | "multiple" = "single",
  config: Object = {}
): string {
  if (!value) return "";

  const options = Object.assign(
    {
      includeTime: false,
      locale: "en-US",
    },
    config
  );

  switch (mode) {
    case "range": {
      const { from, to } = value as { from?: Date; to?: Date };
      return from && to
        ? formatDateRange(from, to, { ...options, separator: " - " })
        : "";
    }

    case "multiple": {
      const dates = value as Date[];
      return Array.isArray(dates)
        ? dates.map((d) => formatDateRange(d, d, options)).join("; ")
        : "";
    }

    case "single":
    default: {
      return formatDateRange(value as Date, value as Date, options);
    }
  }
}
