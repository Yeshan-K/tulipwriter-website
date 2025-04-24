// app/actions/auth.ts
"use server"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../lib/firebase"

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if (!userCredential.user.emailVerified) {
      await auth.signOut()
      return { error: "Email not verified" }
    }

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider)
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
