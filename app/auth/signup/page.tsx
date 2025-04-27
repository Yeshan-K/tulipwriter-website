// app/(auth)/login/page.tsx
"use client"

import { Button, Fieldset, Group, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

import { useRouter } from "next/navigation"

import { useState } from "react"
import { useAppStore } from "store/appStore"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import { firebaseApp, getFirebaseAuth } from "lib/firebase"
import { useRedirectParam } from "components/Auth/useRedirectParam"
import { useRedirectAfterLogin } from "components/Auth/useRedirectAfterLogin"
import { useLoadingCallback } from "react-loading-hook"
import { loginWithCredential } from "api"

export default function LoginPage() {
  const [hasLogged, setHasLogged] = useState(false)
  const redirect = useRedirectParam()
  const redirectAfterLogin = useRedirectAfterLogin()

  const [registerWithEmailAndPassword, isRegisterLoading, error] = useLoadingCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      const credential = await createUserWithEmailAndPassword(auth, email, password)

      await loginWithCredential(credential)
      await sendEmailVerification(credential.user)
      redirectAfterLogin()

      setHasLogged(true)
    }
  )

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

  return (
    <section className="bg-appBackground">
      <div className="mx-auto max-w-(--breakpoint-xl) items-center justify-start rounded-xl lg:px-0">
        <form onSubmit={form.onSubmit(registerWithEmailAndPassword)}>
          <Fieldset
            variant="outline"
            legend="Sign up"
            classNames={{
              legend: "text-3xl pb-1 px-2 font-light",
              root: "border max-w-(--breakpoint-sm) bg-appBackgroundAccent border-appLayoutBorder font-serif w-full pt-2 pb-4 md:pb-6 px-4 md:px-6 flex flex-col gap-4 md:gap-4 shadow-sm shadow-appLayoutDarkHover",
            }}
            radius="lg"
            pos="relative"
          >
            <LoadingOverlay visible={isRegisterLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                Sign up
              </Button>
            </Group>
          </Fieldset>
        </form>
      </div>
    </section>
  )
}
