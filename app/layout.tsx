import {
  ColorSchemeScript,
  colorsTuple,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
  MantineTheme,
  virtualColor,
} from "@mantine/core"
import { cookies, headers } from "next/headers"
import { getTokens } from "next-firebase-auth-edge"
import { AuthProvider } from "components/Auth/AuthProvider"
import { toUser } from "components/Auth/user"
import { NavigationMenu } from "components/NavigationMenu/NavigationMenu"

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"
import "styles/tailwind.css"
import { clientConfig, serverConfig } from "lib/config"

const theme = createTheme({
  activeClassName: "",
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  const user = tokens ? toUser(tokens) : null

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="dark bg-appBackground h-screen max-h-screen w-screen max-w-screen overflow-hidden">
        <AuthProvider user={user}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <div
              id="AppContainer"
              className="bg-appBackground relative flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll overscroll-none font-serif"
            >
              <div className="NavigationMenu bg-appBackground border-appLayoutBorder sticky top-0 h-fit w-full border-b px-4 md:border-0 md:px-12 lg:px-6">
                <NavigationMenu auth={!tokens} key="Navigation Menu" />
              </div>
              {children}
            </div>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
