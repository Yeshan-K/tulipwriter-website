// app/(auth)/login/page.tsx
"use client"

import { Button, Fieldset, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAuth } from "../../../components/AuthProvider"
import { signInWithEmail } from "../../actions/auth"

export default function LoginPage() {
  // const [state, formAction] = useFormState(
  //   (_: unknown, formData: FormData) => {
  //     const email = formData.get("email") as string
  //     const password = formData.get("password") as string
  //     return signInWithEmail(email, password)
  //   },
  //   { success: false }
  // )
  const { user } = useAuth()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  return (
    <section className="bg-appBackground">
      <div className="mx-auto grid max-w-(--breakpoint-md) px-4 font-sans md:px-12">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              <Button variant="outline" type="submit">Submit</Button>
            </Group>
          </Fieldset>
        </form>
      </div>
    </section>
  )

  return (
    <div>
      <form action={formAction}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </div>
  )
}
