// lib/session.ts
import { SessionCookieOptions } from "firebase-admin/auth"
import { cookies } from "next/headers"
import { adminAuth } from "./firebaseAdmin"

export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };

export async function isUserAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession())
  if (!_session) return false

  try {
    const isRevoked = !(await adminAuth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session!)
  const currentUser = await adminAuth.getUser(decodedIdToken.uid)

  return currentUser
}

async function getSession() {
  try {
    const cookieStore = await cookies()
    return cookieStore.get("__session")?.value
  } catch (error) {
    console.error("Failed to retrieve session cookie:", error)
    return undefined
  }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return adminAuth.createSessionCookie(idToken, sessionCookieOptions)
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await adminAuth.verifySessionCookie(session)

  return await adminAuth.revokeRefreshTokens(decodedIdToken.sub)
}