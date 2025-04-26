// app/api/auth/sign-in/route.ts

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { APIResponse, createSessionCookie } from "lib/session"

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string }
  const idToken = reqBody.idToken

  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn })

  const cookieStore = await cookies()
  cookieStore.set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  })

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: "Signed in successfully.",
  })
}
