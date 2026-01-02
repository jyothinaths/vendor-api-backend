const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}, type: "admin" | "org" = "admin") {
  const token =
    type === "admin"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("session="))
          ?.split("=")[1]
      : document.cookie
          .split("; ")
          .find((row) => row.startsWith("org-session="))
          ?.split("=")[1]

  const headers = new Headers(options.headers)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  headers.set("Content-Type", "application/json")

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Handle unauthorized - redirect to appropriate login
    window.location.href = type === "admin" ? "/login" : "/org/login"
    return null
  }

  return response.json()
}
