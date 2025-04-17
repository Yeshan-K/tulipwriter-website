import NavigationMenu from "components/NavigationMenu/NavigationMenu"
import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavigationMenu />
        {children}
      </body>
    </html>
  )
}
