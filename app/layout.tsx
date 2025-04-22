import { NavigationMenu } from "components/NavigationMenu/NavigationMenu"
import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dark bg-appBackground h-screen max-h-screen w-screen max-w-screen overflow-hidden font-serif">
        <div id="AppContainer" className="relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-none">
          <div className="NavigationMenu bg-appBackground border-appLayoutBorder sticky top-0 h-fit w-full border-0 px-4 md:px-12 lg:px-6">
            <NavigationMenu />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
