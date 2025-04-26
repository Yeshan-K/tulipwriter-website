"use client"

import { Button } from "@mantine/core"
import { signOut } from "lib/auth"
import { useRouter } from "next/navigation"

import React from "react"
import { useAppStore } from "store/appStore"

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

export default function Page() {
  const setLoggedIn = useAppStore((state) => state.setLoggedIn)

  const router = useRouter()

  const handleSignOut = async () => {
    const isOk = await signOut()

    if (isOk) {
      setLoggedIn("Not logged in")
      router.push("/login")
    }
  }

  return (
    <div>
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Example: SSR + data fetching with ID token</h3>

          <p>
            This page requires authentication. It will do a server-side redirect (307) to the login page if the auth
            cookies are not set.
          </p>
          <p>Your favorite color is: blue</p>

          <Button onClick={() => handleSignOut()} variant="outline" type="submit">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
