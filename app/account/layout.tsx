// app/(protected)/layout.tsx
"use server"

import { redirect } from "next/navigation"

export default async function Account({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
