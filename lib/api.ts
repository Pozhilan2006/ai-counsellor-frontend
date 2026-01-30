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

// ============================================
// USER STAGE
// ============================================
export async function getUserStage(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: GET /user/stage", { email });

  const res = await fetch(`${baseUrl}/user/stage?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to fetch user stage" }));
    throw new Error(errorData.message || errorData.error || "Failed to fetch user stage");
  }

  return res.json();
}

// ============================================
// ONBOARDING
// ============================================
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

// ============================================
// SHORTLISTING
// ============================================
export async function addToShortlist(email: string, universityId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: POST /shortlist/add", { email, universityId });

  const res = await fetch(`${baseUrl}/shortlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, university_id: universityId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to add to shortlist" }));
    throw new Error(errorData.message || errorData.error || "Failed to add to shortlist");
  }

  return res.json();
}

export async function removeFromShortlist(email: string, universityId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: POST /shortlist/remove", { email, universityId });

  const res = await fetch(`${baseUrl}/shortlist/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, university_id: universityId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to remove from shortlist" }));
    throw new Error(errorData.message || errorData.error || "Failed to remove from shortlist");
  }

  return res.json();
}

export async function getShortlist(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: GET /shortlist", { email });

  const res = await fetch(`${baseUrl}/shortlist?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to fetch shortlist" }));
    throw new Error(errorData.message || errorData.error || "Failed to fetch shortlist");
  }

  return res.json();
}

// ============================================
// UNIVERSITY LOCKING
// ============================================
export async function lockUniversityAPI(email: string, universityId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: POST /university/lock", { email, universityId });

  const res = await fetch(`${baseUrl}/university/lock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, university_id: universityId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to lock university" }));
    throw new Error(errorData.message || errorData.error || "Failed to lock university");
  }

  return res.json();
}

export async function unlockUniversityAPI(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: POST /university/unlock", { email });

  const res = await fetch(`${baseUrl}/university/unlock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to unlock university" }));
    throw new Error(errorData.message || errorData.error || "Failed to unlock university");
  }

  return res.json();
}

// ============================================
// TASKS
// ============================================
export async function getTasks(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: GET /tasks", { email });

  const res = await fetch(`${baseUrl}/tasks?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to fetch tasks" }));
    throw new Error(errorData.message || errorData.error || "Failed to fetch tasks");
  }

  return res.json();
}

export async function completeTaskAPI(email: string, taskId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log("API CALL: POST /tasks/complete", { email, taskId });

  const res = await fetch(`${baseUrl}/tasks/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, task_id: taskId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to complete task" }));
    throw new Error(errorData.message || errorData.error || "Failed to complete task");
  }

  return res.json();
}
