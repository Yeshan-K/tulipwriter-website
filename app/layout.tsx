import NavigationMenu from "components/NavigationMenu/NavigationMenu"
import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dark h-screen max-h-screen w-screen max-w-screen overflow-hidden font-serif bg-appBackground">
        <div
          id="AppContainer"
          className="relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-none"
        >
          <div className="NavigationMenu sticky top-0 h-fit w-full bg-transparent">
            <NavigationMenu />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
