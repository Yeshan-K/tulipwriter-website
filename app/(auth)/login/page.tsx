// app/(auth)/login/page.tsx
"use client"

import { Button, Fieldset, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "../../../components/AuthProvider"
import { signInWithEmail } from "../../actions/auth"

export default function LoginPage() {
  const { user, loading, refreshAuth } = useAuth()

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      console.log(values)
      const result = await signInWithEmail(values.email, values.password)
      console.log(result)
      if (result.error) {
        setError(result.error)
      } else {
        router.push("/account") // Redirect on success
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  console.log(user)

  if (loading && user) {
    console.log(user)
    redirect("/account")
  }

  return (
    <section className="bg-appBackground">
      <div className="mx-auto grid max-w-(--breakpoint-md) px-4 font-sans md:px-12">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Fieldset legend="Login" variant="unstyled" radius="lg">
            <TextInput
              key={form.key("email")}
              {...form.getInputProps("email")}
              label="Email"
              placeholder="Email"
              radius="sm"
              mt="md"
            />
            <PasswordInput
              mt="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
              label="Password"
              radius="sm"
              placeholder="password"
            />
            <Group justify="flex-end" mt="md">
              <Button variant="outline" type="submit">
                Submit
              </Button>
            </Group>
          </Fieldset>
        </form>
      </div>
    </section>
  )
}
