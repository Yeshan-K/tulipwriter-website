"use server"

import { isUserAuthenticated } from "lib/session"

export async function isLoggedIn() {
  if (await isUserAuthenticated()) {
    return "Logged in"
  } else return "Not logged in"
}
