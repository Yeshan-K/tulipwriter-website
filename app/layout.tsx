import {
  ColorSchemeScript,
  colorsTuple,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
  MantineTheme,
  virtualColor,
} from "@mantine/core"
import { NavigationMenu } from "components/NavigationMenu/NavigationMenu"
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"
import "styles/tailwind.css"


const appLayoutBorderLight = colorsTuple("hsl(0, 0%, 14.9%)")
const appLayoutBorderDark = colorsTuple("hsl(0, 0%, 65.9%)")

const theme = createTheme({
  colors: {
    appLayoutBorderLight,
    appLayoutBorderDark,
    appLayoutBorder: virtualColor({
      name: "appLayoutBorder",
      light: "appLayoutBorderLight",
      dark: "appLayoutBorderDark",
    }),
  },
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="dark bg-appBackground h-screen max-h-screen w-screen max-w-screen overflow-hidden">
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <div
            id="AppContainer"
            className="bg-appBackground relative h-full w-full overflow-x-hidden overflow-y-scroll overscroll-none font-serif"
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
