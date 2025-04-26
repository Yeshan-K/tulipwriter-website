// app/(protected)/layout.tsx
"use server"
import { redirect } from "next/navigation"
import { getCurrentUser, isUserAuthenticated } from "../../lib/session"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!(await isUserAuthenticated())) {
    redirect("/login")
  }
  // if (!user.email_verified) {
  //   redirect("/verify-email")
  // }

  return <>{children}</>
}
