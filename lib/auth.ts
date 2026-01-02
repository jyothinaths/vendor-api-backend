import { cookies } from "next/headers"

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get("session")?.value
}

export async function getOrgSession() {
  const cookieStore = await cookies()
  return cookieStore.get("org-session")?.value
}

export async function setSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function setOrgSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("org-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function orgLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("org-session")
}
