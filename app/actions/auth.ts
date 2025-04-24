// app/actions/auth.ts
"use server"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../lib/firebase"
import { adminAuth } from "../../lib/firebaseAdmin"
import { createSessionCookie, destroySession } from "../../lib/session"

export async function getUser() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { error: "No current user found." }
    }
    return { success: true, user }
  } catch {
    return { error: "Invalid or expired session cookie." }
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    // 3. Server-side authentication
    // 1. Client-side sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if (!userCredential.user.emailVerified) {
      await auth.signOut()
      return { error: "EMAIL_NOT_VERIFIED" }
    }

    // 4. Create server session
    const token = await userCredential.user.getIdToken()
    await createSessionCookie(token)

    // 5. Return user-safe data
    return {
      success: true,
    }
  } catch (error: unknown) {
    await destroySession()

    // Handle specific error codes
    const err = error as { code?: string; message?: string }
    const errorCode = err.code ?? err.message
    switch (errorCode) {
      case "auth/wrong-password":
      case "auth/user-not-found":
        return { error: "Invalid credentials" }
      case "auth/too-many-requests":
        return { error: "Too many attempts. Try again later" }
      default:
        console.error("Login error:", error)
        return { error: "Authentication failed" }
    }
  }
}

export async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider)
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}
