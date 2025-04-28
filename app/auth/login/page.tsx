// app/(auth)/login/page.tsx
"use client"

import { Box, Button, Divider, Fieldset, Group, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
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
    <section className="bg-appBackground flex grow-1 items-start justify-center pt-4 md:pt-12">
      <div className="w-full items-center justify-start rounded-xl lg:px-0">
        <form className="h-fit w-full md:w-fit mx-auto relative" onSubmit={form.onSubmit(handleLoginWithEmailAndPassword)}>
          <LoadingOverlay visible={isEmailLoading} zIndex={1000} overlayProps={{ blur: 0, opacity: 0 }} />

          <Fieldset
            variant="unstyled"
            legend="Log in to your account"
            classNames={{
              legend: "text-3xl pb-1 px-2 mx-auto font-light",
              root: "md:border rounded-xl overflow-hidden mx-auto xl:mx-auto w-full md:min-w-(--breakpoint-sm) max-w-(--breakpoint-sm) md:bg-appBackgroundAccent border-appLayoutBorder font-serif w-full pt-2 pb-4 md:pb-6 px-4 md:px-10 flex flex-col gap-4 md:gap-6 md:shadow-2xl shadow-appLayoutDarkHover",
            }}
            radius="lg"
            pos="relative"
          >
            <TextInput
              size="lg"
              classNames={{
                input:
                  "focus:bg-appLayoutInputBackground  bg-appBackgroundAccent md:bg-appBackground focus:border-appLayoutTextMuted border-appLayoutBorder pb-[3px]",
                label: "text-lg mb-2 pl-1 text-appLayoutTextMuted",
              }}
              key={form.key("email")}
              {...form.getInputProps("email")}
              label="Email"
              placeholder="Email"
              radius="md"
            />

            <div className="flex h-fit w-full flex-col items-end gap-3 md:flex-row md:items-center">
              <PasswordInput
                size="lg"
                classNames={{
                  root: "w-full md:grow-1",
                  innerInput:
                    " focus:bg-appLayoutInputBackground bg-appBackgroundAccent md:bg-appBackground border border-appLayoutBorder overflow-hidden rounded-lg focus:border-appLayoutTextMuted pb-[3px]",
                  input: "bg-transparent border-none focus:border-appLayoutTextMuted",
                  label: "text-lg mb-2 pl-1 text-appLayoutTextMuted",
                }}
                key={form.key("password")}
                {...form.getInputProps("password")}
                label="Password"
                radius="md"
                placeholder="password"
              />
              <Button
                radius="md"
                classNames={{
                  root: "w-1/3 md:w-fit mt-3 md:mt-9 font-normal border border-appLayoutText text-appBackground bg-appLayoutText hover:bg-appLayoutTextMuted hover:text-appBackgroundAccent hover:border-appLayoutTextMuted",
                }}
                size="lg"
                variant="outline"
                type="submit"
              >
                <span className="icon-[ep--right] h-full w-[2rem]"></span>
              </Button>
            </div>

            <div className="my-2 flex h-fit w-full items-center gap-2 md:my-4">
              <span className="bg-appLayoutInverseHover h-px grow-1"></span>
              <span className="text-appLayoutTextMuted h-[1rem] w-fit md:h-[1.5rem]">or</span>
              <span className="bg-appLayoutInverseHover h-px grow-1"></span>
            </div>

            <div className="h-[20rem] w-full"></div>
          </Fieldset>
        </form>
      </div>
    </section>
  )
}
