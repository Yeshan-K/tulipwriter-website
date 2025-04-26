import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

let admin: App
if (getApps().length > 0) {
  admin = getApp()
} else if (process.env.NODE_ENV === "development") {
  admin = initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID })
} else {
  admin = initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export const adminAuth = getAuth(admin)