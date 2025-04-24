// app/api/auth/session/route.ts
import { NextResponse } from "next/server"
import { adminAuth } from "../../../../lib/firebaseAdmin"

export async function POST(request: Request) {
  try {
    const { token } = (await request.json()) as { token: string }

    if (!token) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 400 })
    }

    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn })

    // Set secure HTTP-only cookie
    const response = NextResponse.json({ status: "success" })
    response.cookies.set({
      name: "__session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    // Add token revocation logic if needed
    const response = NextResponse.json({ status: "success" })

    // Clear session cookie
    response.cookies.delete("__session")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 })
  }
}
