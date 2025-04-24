import React from "react"

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

export default function Web() {
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
        </div>
      </div>
    </div>
  )
}
