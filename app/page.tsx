import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirecting to portal selection by default
  redirect("/portal")
}
