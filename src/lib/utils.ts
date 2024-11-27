import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodType } from "zod";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMissingFields<T extends ZodType<any, any>>(
  schema: T,
  data: Record<string, any>
): string {
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    return "";
  }

  const missingFields = parsed.error.errors
    .filter(
      (error) =>
        error.code === "invalid_type" && error.message.includes("Required")
    )
    .map((error) => error.path.join("."))
    .join(", ");

  return `Required fields: ${missingFields}`;
}

export async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}
