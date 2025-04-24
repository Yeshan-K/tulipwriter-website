// components/AuthProvider.tsx
"use client"

import { browserLocalPersistence, setPersistence, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { getUser } from "../app/actions/auth"
import { auth } from "../lib/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshAuth: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshAuth = async () => {
    console.log("REFRESHING AUTH")
    console.log(auth.currentUser)

    // const { success, user } = await getUser()
    // console.log(success, user)

    if (auth.currentUser) {
      await auth.currentUser.getIdToken(true) // Force token refresh
      setUser({ ...auth.currentUser }) // Create new object reference
    }
  }

  useEffect(() => {
    let unsubscribe: () => void

    const initializeAuth = async () => {
      await setPersistence(auth, browserLocalPersistence)

      unsubscribe = auth.onAuthStateChanged(async (user) => {
        console.log("Auth state changed:", user)
        if (user) {
          // Verify token with backend
          const token = await user.getIdToken()
          const res = await fetch("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (!res.ok) {
            await auth.signOut()
            setUser(null)
          } else {
            setUser(user)
          }
        } else {
          setUser(null)
        }
        setLoading(false)
      })

      // Trigger initial check
      auth.currentUser?.getIdToken().then(refreshAuth)
    }

    initializeAuth()

    return () => {
      if (unsubscribe) unsubscribe()
      // Clear auth state on unmount
      setUser(null)
      setLoading(true)
    }
  }, [])

  return <AuthContext.Provider value={{ user, loading, refreshAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
