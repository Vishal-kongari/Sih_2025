import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Backend base URL
export const CHAT_API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export async function sendChatMessage(userMessage: string, userId?: string): Promise<string> {
  const resp = await fetch(`${CHAT_API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage, userId }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Request failed: ${resp.status}`);
  }
  const data = await resp.json();
  return data.reply as string;
}