// API helper for backend communication

import type { CounsellorPayload, CounsellorResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

/**
 * Call the AI Counsellor backend API
 * @param payload - The counsellor request payload
 * @returns Promise with the counsellor response
 */
export async function callCounsellor(
  payload: CounsellorPayload
): Promise<CounsellorResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/counsel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
