import { parseDate } from "chrono-node";

/**
 * Parses a single date string safely.
 * Returns a valid Date object or undefined if parsing fails.
 */
function parseSafeDate(input: unknown): Date | undefined {
  const parsed = parseDate(String(input));
  return parsed instanceof Date && !isNaN(parsed.getTime())
    ? parsed
    : undefined;
}

/**
 * Safely parses dates based on the specified mode:
 * - "single": parses a single date
 * - "range": parses an object with `from` and `to` fields
 * - "multiple": parses an array of dates
 */
export function dateParser(
  date: unknown,
  mode: "single" | "range" | "multiple" = "single"
): Date | Date[] | { from?: Date; to?: Date } | undefined {
  if (!date) return undefined;

  if (typeof date === "string" && mode !== "single") {
    try {
      date = JSON.parse(date);
    } catch {
      return undefined;
    }
  }

  switch (mode) {
    case "range": {
      const { from, to } = (date as { from?: unknown; to?: unknown }) || {};
      const parsedFrom = parseSafeDate(from);
      const parsedTo = parseSafeDate(to);
      if (parsedFrom || parsedTo) {
        return {
          from: parsedFrom!,
          to: parsedTo!,
        };
      }
      return undefined;
    }

    case "multiple": {
      return Array.isArray(date) && date.length > 0
        ? date.map(parseSafeDate).filter(Boolean)
        : undefined;
    }

    case "single":
    default:
      return parseSafeDate(date);
  }
}
