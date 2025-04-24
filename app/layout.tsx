import { NavigationMenu } from "components/NavigationMenu/NavigationMenu"
import "styles/tailwind.css"
import { AuthProvider } from "../components/AuthProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="dark bg-appBackground h-screen max-h-screen w-screen max-w-screen overflow-hidden font-serif">
          <div id="AppContainer" className="relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-none">
            <div className="NavigationMenu bg-appBackground border-appLayoutBorder sticky top-0 h-fit w-full border-b px-4 md:border-0 md:px-12 lg:px-6">
              <NavigationMenu />
            </div>
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
