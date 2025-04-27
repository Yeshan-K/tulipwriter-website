// app/(auth)/login/page.tsx
"use client"

import { Button, Fieldset, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

import { useRouter } from "next/navigation"

import { useState } from "react"
import { signIn, signUpWithEmail } from "lib/auth"
import { useAppStore } from "store/appStore"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { firebaseApp } from "lib/firebase"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const setLoggedIn = useAppStore((state) => state.setLoggedIn)

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

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      await createUserWithEmailAndPassword(getAuth(firebaseApp), values.email, values.password)
      router.push("/login")
    } catch (error) {
      console.error(error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-appBackground">
      <div className="mx-auto mt-4 grid max-w-(--breakpoint-sm) px-4 font-sans md:mt-8 md:px-12">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Fieldset
            variant="outline"
            legend="Sign up"
            classNames={{
              legend: "text-3xl pb-1 px-2 font-light",
              root: "border border-appLayoutBorder font-serif w-full pt-2 pb-4 md:pb-6 px-4 md:px-6 flex flex-col gap-4 md:gap-4",
            }}
            radius="lg"
          >
            <TextInput
              size="lg"
              classNames={{
                input: "bg-transparent focus:bg-appLayoutInputBackground pb-[3px]",
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
                innerInput: " focus:bg-appLayoutInputBackground pb-[3px]",
                input: "bg-transparent ",
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
