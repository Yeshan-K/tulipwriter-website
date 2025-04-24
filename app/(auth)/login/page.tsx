// app/(auth)/login/page.tsx
"use client"

import { useFormState } from "react-dom"
import { signInWithEmail } from "../../actions/auth"
import { useAuth } from "../../../components/AuthProvider"

export default function LoginPage() {
  const [state, formAction] = useFormState(
    (_: unknown, formData: FormData) => {
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      return signInWithEmail(email, password)
    },
    { success: false }
  )
  const { user } = useAuth()

  return (
    <div>
      <form action={formAction}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </div>
  )
}
