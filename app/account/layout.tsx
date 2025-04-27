// app/(protected)/layout.tsx
"use server"

import { redirect } from "next/navigation"
import { isUserAuthenticated } from "../../lib/session"

export default async function Account({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
