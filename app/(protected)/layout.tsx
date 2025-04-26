// app/(protected)/layout.tsx
"use server"

import { redirect } from "next/navigation"
import { isUserAuthenticated } from "../../lib/session"

export default async function ProtectedLayout({ children }: { readonly children: React.ReactNode }) {
  if (!(await isUserAuthenticated())) {
    redirect("/login")
  } else {
    return <>{children}</>
  }
}
