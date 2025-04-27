// app/(auth)/layout.tsx
"use server"

export default async function Auth({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
