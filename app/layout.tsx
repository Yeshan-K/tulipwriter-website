import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core"
import { NavigationMenu } from "components/NavigationMenu/NavigationMenu"
import "styles/tailwind.css"
import "@mantine/core/styles.css"

const theme = {}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="dark h-screen max-h-screen w-screen max-w-screen overflow-hidden">
        <MantineProvider defaultColorScheme="dark">
          <div
            id="AppContainer"
            className="bg-appBackground relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-none font-serif"
          >
            <div className="NavigationMenu bg-appBackground border-appLayoutBorder sticky top-0 h-fit w-full border-b px-4 md:border-0 md:px-12 lg:px-6">
              <NavigationMenu key="Navigation Menu" />
            </div>
            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  )
}
