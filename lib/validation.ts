const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizePhone(value: string): string {
  return value.trim();
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

const URGENCY_VALUES = new Set(["ASAP", "30 min", "Flexible"]);

export function isValidUrgency(value: string): boolean {
  return URGENCY_VALUES.has(value.trim());
}
