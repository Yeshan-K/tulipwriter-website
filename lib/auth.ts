"use client"

import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  reload,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

import { auth, firebaseApp, googleProvider } from "./firebase"
import { APIResponse } from "./session"

export async function refreshLoginOnServer() {
  try {
    const user = getAuth(firebaseApp).currentUser

    console.log("user:", user)
    if (!user) return false

    await user.reload()

    const idToken = await user.getIdToken()

    console.log("ID TOKEN: ", idToken)

    const response = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })

    const resBody = (await response.json()) as APIResponse<string>
    console.log("RESBODY: ", resBody)
    return "resbody"
  } catch (error) {
    console.error("Error verifying authentication", error)
    return "error"
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)

    const idToken = await userCreds.user.getIdToken()

    const response = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
    const resBody = (await response.json()) as APIResponse<string>
    if (response.ok && resBody.success) {
      return true
    } else return false
  } catch (error) {
    console.error("Error signing in", error)
    return false
  }
}

export async function signInWithGoogle() {
  try {
    const userCreds = await signInWithPopup(auth, googleProvider)
    const idToken = await userCreds.user.getIdToken()

    const response = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
    const resBody = (await response.json()) as APIResponse<string>
    if (response.ok && resBody.success) {
      return true
    } else return false
  } catch (error) {
    console.error("Error signing in with Google", error)
    return false
  }
}

export async function signOut() {
  try {
    await auth.signOut()

    const response = await fetch("/api/auth/signOut", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    const resBody = (await response.json()) as APIResponse<string>
    if (response.ok && resBody.success) {
      return true
    } else return false
  } catch (error) {
    console.error("Error signing out", error)
    return false
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password)
    
    const idToken = await userCreds.user.getIdToken()

    const response = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
    const resBody = (await response.json()) as APIResponse<string>
    if (response.ok && resBody.success) {
      return true
    } else return false
  } catch (error) {
    console.error("Error signing up with email", error)
    return false
  }
}
