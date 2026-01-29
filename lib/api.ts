export async function callCounsellor(email: string, message: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const payload = {
    email,
    message
  };

  console.log("API CALL: POST /counsel", payload);

  const res = await fetch(`${baseUrl}/counsel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Counsellor API failed" }));
    throw new Error(errorData.message || errorData.error || "Counsellor API failed");
  }

  return res.json();
}

export async function getRecommendations(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: GET /recommendations", { email });

  const res = await fetch(`${baseUrl}/recommendations?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to fetch recommendations" }));
    throw new Error(errorData.message || errorData.error || "Failed to fetch recommendations");
  }

  return res.json();
}

export async function submitOnboarding(profile: any, finalSubmit: boolean = true) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const payload = {
    ...profile,
    final_submit: finalSubmit
  };

  console.log("API CALL: POST /onboarding", { final_submit: finalSubmit, preferred_countries: payload.preferred_countries });

  const res = await fetch(`${baseUrl}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to submit onboarding profile" }));
    throw new Error(errorData.message || errorData.error || "Failed to submit onboarding profile");
  }

  return res.json();
}
