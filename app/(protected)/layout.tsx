// app/(protected)/layout.tsx
import { redirect } from "next/navigation"
import { getCurrentUser } from "../../lib/session"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (!user.email_verified) {
    redirect("/verify-email")
  }

  return <>{children}</>
}
