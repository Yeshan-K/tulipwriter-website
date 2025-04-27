"use client"

import { Button } from "@mantine/core"
import { checkEmailVerification, logout } from "api"
import { useAuth } from "components/Auth/AuthContext"
import { signOut } from "firebase/auth"
import { getFirebaseAuth } from "lib/firebase"
import { useRouter } from "next/navigation"

import React from "react"
import { useLoadingCallback } from "react-loading-hook"

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

export default function Page() {
  const router = useRouter()
  const { user } = useAuth()
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false)

  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
    await logout()

    router.refresh()

    setHasLoggedOut(true)
  })

  const [handleReCheck, isReCheckLoading] = useLoadingCallback(async () => {
    await checkEmailVerification()
    router.refresh()
  })

  return (
    <div>
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>ACCOUNT HOME </h3>
          {!user?.emailVerified && (
            <div>
              Email Not verified
              <Button
                loading={isReCheckLoading}
                disabled={isReCheckLoading}
                onClick={handleReCheck}
                variant="outline"
                mr={2}
              >
                Re-check
              </Button>
            </div>
          )}
          <Button
            loading={isLogoutLoading || hasLoggedOut}
            disabled={isLogoutLoading || hasLoggedOut}
            onClick={handleLogout}
            variant="outline"
            type="submit"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
