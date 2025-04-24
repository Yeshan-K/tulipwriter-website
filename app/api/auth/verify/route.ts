// app/api/auth/verify/route.ts
import { NextResponse } from "next/server"
import { adminAuth } from "../../../../lib/firebaseAdmin"

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split("Bearer ")[1]

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  try {
    await adminAuth.verifyIdToken(token)
    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
