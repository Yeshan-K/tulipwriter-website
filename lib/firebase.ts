import { getApp, initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { clientConfig } from "./config"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// const createFirebaseApp = () => {
//   return initializeApp(firebaseConfig)
// }

console.log("INITIALIZING APP")
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
setPersistence(auth, inMemoryPersistence)

export const googleProvider = new GoogleAuthProvider()

// Emulator
if (process.env.NODE_ENV == "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
}

export function getFirebaseAuth() {
  const auth = getAuth(firebaseApp)

  setPersistence(auth, inMemoryPersistence)

  // App relies only on server token. We make sure Firebase does not store credentials in the browser.
  // See: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/143

  return auth
}
