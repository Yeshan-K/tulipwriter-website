"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { isLoggedIn } from "./Auth/IsLoggedIn"
import { useAppStore } from "store/appStore"
import { Box, Button, Loader } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"

import classes from "../../styles/mantine.module.css"

const NAV_LINKS = [
  {
    label: "Features",
    link: "#",
  },
  {
    label: "Pricing",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
]

export function NavigationMenu() {
  const loggedIn = useAppStore((state) => state.loggedIn)
  const setLoggedIn = useAppStore((state) => state.setLoggedIn)

  const pathname = usePathname()

  const isOnLoginPage = pathname === "/login"

  const isOnSignupPage = pathname === "/signup"

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(true)

  const [isMd, setIsMd] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMd(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    const callisLoggedIn = async () => {
      setLoggedIn(await isLoggedIn())
    }

    callisLoggedIn()

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  useEffect(() => {
    if (isMd) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isMd])

  return (
    <div className="mx-auto flex max-w-(--breakpoint-xl) items-center justify-start rounded-xl md:h-[5rem] md:border-0 lg:px-0">
      <nav className="border-appLayoutBorder bg-appBackground w-full">
        <div className="mx-auto flex h-full max-w-screen-xl flex-wrap items-center justify-between gap-4 py-4 md:justify-start md:p-4">
          {/* ... (Logo and button code remains the same) */}

          <Link href="/" className="flex items-center space-x-3 px-4 rtl:space-x-reverse">
            <span className="self-center text-2xl font-thin whitespace-nowrap dark:text-white">Tulip Writer</span>
          </Link>
          <div className="flex items-center gap-0 space-x-0 font-sans md:order-3 md:gap-0 md:space-x-0 rtl:space-x-reverse">
            {loggedIn &&
              (loggedIn == "Logged in" ? (
                <Link
                  href={"/account/home"}
                  className="text-appLayoutText border-appLayoutBorder md:text-appLayoutTextMuted md:hover:text-appLayoutText hover:bg-appLayoutInverseHover flex h-full items-center justify-start rounded-lg border px-5 py-2 text-lg md:justify-center md:border-0 md:p-0 md:pt-[4px] md:text-lg md:hover:bg-transparent"
                >
                  Account
                </Link>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push("/login")
                    }}
                    variant="unstyled"
                    classNames={{
                      root: "focus:text-appLayoutText active:bg-appLayoutInverseHover disabled:active:bg-transparent px-2 md:px-4 text-lg h-fit w-fit font-light bg-transparent  border-0  border-appLayoutTextMuted text-appLayoutTextMuted px-2 py-1 overflow-hidden font-serif hover:border-white hover:text-appLayoutText hover:bg-transparent scale-[1.0] hover:scale-[1.00] disabled:hover:scale-[1.0] overflow-hidden disabled:hover:border-appLayoutTextMuted disabled:border-appLayoutTextMuted disabled:text-appLayoutBorder transition-colors duration-100",
                    }}
                    disabled={isOnLoginPage}
                    radius="xl"
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => {
                      router.push("/signup")
                    }}
                    variant="unstyled"
                    classNames={{
                      root: "focus:text-appLayoutText active:bg-appLayoutInverseHover disabled:active:bg-transparent px-2 md:px-4 text-lg h-fit w-fit font-light bg-transparent  border-0  border-appLayoutTextMuted text-appLayoutTextMuted px-2 py-1 overflow-hidden font-serif hover:border-white hover:text-appLayoutText hover:bg-transparent scale-[1.0] hover:scale-[1.00] disabled:hover:scale-[1.0] overflow-hidden disabled:hover:border-appLayoutTextMuted disabled:border-appLayoutTextMuted disabled:text-appLayoutBorder transition-colors duration-100",
                    }}
                    disabled={isOnSignupPage}
                    radius="xl"
                  >
                    Sign up
                  </Button>
                </>
              ))}

            {!loggedIn && <Loader size={30} type="dots" color="white" classNames={{ root: "text-appLayoutBorder" }} />}

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="text-appLayoutText hover:bg-appLayoutInverseHover focus:ring-appLayoutBorder inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm focus:ring-2 focus:outline-none md:hidden"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="order-2 hidden grow-1 basis-0 md:block"></div>

          <AnimatePresence>
            {(isMd || isOpen) && (
              <motion.div
                key={"NavMenuButtons"}
                initial={{ height: isMd ? "3rem" : 0, opacity: isMd ? 1 : 0 }}
                animate={{
                  height: isMd ? "3rem" : isOpen ? "10rem" : 0,
                  opacity: isMd ? "3rem" : isOpen ? 1 : 0,
                }}
                exit={{ height: isMd ? 1 : 0, opacity: isMd ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className={`w-full items-center justify-between overflow-hidden md:order-1 md:flex md:w-auto`}
                id="navbar-cta"
              >
                <ul className="border-appLayoutBorder grid h-full grid-cols-1 gap-2 rounded-lg p-0 font-medium md:mt-0 md:flex md:flex-row md:gap-8 md:p-0 rtl:space-x-reverse">
                  {NAV_LINKS.map((linkItem) => (
                    <li className="w-full overflow-hidden md:w-fit" key={linkItem.label}>
                      <Link
                        href={linkItem.link}
                        className="text-appLayoutText border-appLayoutBorder md:text-appLayoutTextMuted md:hover:text-appLayoutText hover:bg-appLayoutInverseHover flex h-full items-center justify-start rounded-lg border px-5 py-2 text-lg md:justify-center md:border-0 md:p-0 md:pt-[4px] md:text-lg md:hover:bg-transparent"
                      >
                        {linkItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  )
}
