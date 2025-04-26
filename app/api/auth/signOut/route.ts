// app/api/auth/sign-in/route.ts

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { APIResponse, revokeAllSessions } from "lib/session"

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("__session")?.value

  if (!sessionCookie)
    return NextResponse.json<APIResponse<string>>({ success: false, error: "Session not found." }, { status: 400 })

  cookieStore.delete("__session")

  await revokeAllSessions(sessionCookie)

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: "Signed out successfully.",
  })
}
