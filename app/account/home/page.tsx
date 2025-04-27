"use client"

import { Button } from "@mantine/core"
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
    
    console.log("SIGN OUT!");
  }

  return (
    <div>
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>ACCOUNT HOME </h3>
          <Button onClick={() => handleSignOut()} variant="outline" type="submit">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
