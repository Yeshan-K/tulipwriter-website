// app/api/auth/session/route.ts
import { NextResponse } from "next/server"
import { adminAuth } from "../../../../lib/firebaseAdmin"

export async function POST(request: Request) {
  const { token } = await request.json()

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)

    if (decodedToken) {
      return NextResponse.json({ status: "success" })
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

export async function DELETE() {
  return NextResponse.json({ status: "success" })
}
