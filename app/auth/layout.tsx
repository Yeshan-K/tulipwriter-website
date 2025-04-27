// app/(auth)/layout.tsx
"use server"

import { redirect } from "next/navigation"
import { isUserAuthenticated } from "../../lib/session"
import { refreshLoginOnServer } from "lib/auth"

export default async function ProtectedLayout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
