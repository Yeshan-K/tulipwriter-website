// app/(auth)/login/page.tsx
"use client"

import { Button, Fieldset, Group, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

import { useRouter } from "next/navigation"

import { useState } from "react"
import { useLoadingCallback } from "react-loading-hook"
import { useAppStore } from "store/appStore"
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { firebaseApp, getFirebaseAuth } from "lib/firebase"
import { loginWithCredential } from "api"
import { useRedirectParam } from "components/Auth/useRedirectParam"
import { useRedirectAfterLogin } from "components/Auth/useRedirectAfterLogin"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLogged, setHasLogged] = useState(false)

  const redirect = useRedirectParam()
  const redirectAfterLogin = useRedirectAfterLogin()

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential)
    redirectAfterLogin()
  }

  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] = useLoadingCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setHasLogged(false)

      const auth = getFirebaseAuth()

      await handleLogin(await signInWithEmailAndPassword(auth, email, password))

      setHasLogged(true)
    }
  )

  return (
    <section className="bg-appBackground">
      <div className="mx-auto mt-4 grid max-w-(--breakpoint-sm) px-4 font-sans md:mt-8 md:px-12">
        <form onSubmit={form.onSubmit(handleLoginWithEmailAndPassword)}>
          <Fieldset
            variant="outline"
            legend="Login"
            classNames={{
              legend: "text-3xl pb-1 px-2 font-light",
              root: "border bg-appBackgroundAccent border-appLayoutBorder font-serif w-full pt-2 pb-4 md:pb-6 px-4 md:px-6 flex flex-col gap-4 md:gap-4 shadow-sm shadow-appLayoutDarkHover",
            }}
            radius="lg"
          >
            <LoadingOverlay visible={isEmailLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <TextInput
              size="lg"
              classNames={{
                input:
                  "bg-transparent focus:bg-appBackground focus:border-appLayoutTextMuted border-appLayoutBorder pb-[3px]",
                label: "text-lg mb-1 pl-1",
              }}
              key={form.key("email")}
              {...form.getInputProps("email")}
              label="Email"
              placeholder="Email"
              radius="md"
            />
            <PasswordInput
              size="lg"
              classNames={{
                innerInput:
                  " focus:bg-appBackground border border-appLayoutBorder overflow-hidden rounded-lg focus:border-appLayoutTextMuted pb-[3px]",
                input: "bg-transparent border-none focus:border-appLayoutTextMuted",
                label: "text-lg mb-1 pl-1",
              }}
              key={form.key("password")}
              {...form.getInputProps("password")}
              label="Password"
              radius="md"
              placeholder="password"
            />
            <Group justify="flex-end">
              <Button
                radius="md"
                classNames={{
                  root: "font-normal border border-appLayoutText text-appBackground bg-appLayoutText hover:bg-appLayoutTextMuted hover:text-appBackgroundAccent hover:border-appLayoutTextMuted",
                }}
                size="lg"
                variant="outline"
                type="submit"
                mt="sm"
              >
                Login
              </Button>
            </Group>
          </Fieldset>
        </form>
      </div>
    </section>
  )
}
