// app/(protected)/layout.tsx
"use server"

import { redirect } from "next/navigation"
import { getCurrentUser, isUserAuthenticated } from "../../../lib/session"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (await isUserAuthenticated()) {
    redirect("/account")
  }

  return <>{children}</>
}
