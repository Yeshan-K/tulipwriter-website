// lib/session.ts
import { cookies } from "next/headers"
import { adminAuth } from "./firebaseAdmin"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("__session")?.value

  if (!session) return null

  try {
    const decodedToken = await adminAuth.verifySessionCookie(session)
    return decodedToken
  } catch (error) {
    return null
  }
}

export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
  const cookieStore = await cookies()

  cookieStore.set("__session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: expiresIn,
    path: "/",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.delete("__session")
}
