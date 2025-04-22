"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

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
  }
]

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMd, setIsMd] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMd(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (isMd) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isMd])

  return (
    <motion.div className="border-appLayoutBorder mx-auto flex h-fit max-w-(--breakpoint-xl) items-center justify-start rounded-xl lg:px-0">
      <nav className="border-appLayoutBorder bg-appBackground w-full">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between md:justify-start gap-4 py-4 md:p-4">
          {/* ... (Logo and button code remains the same) */}

          <Link href="#" className="flex items-center space-x-3 px-4 rtl:space-x-reverse">
            <span className="self-center text-2xl font-thin whitespace-nowrap dark:text-white">Tulip Writer</span>
          </Link>
          <div className="flex space-x-3 md:order-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="ml-6 text-appLayoutText focus:ring-appLayoutBorder rounded-lg bg-green-900 px-4 py-2 text-center text-md font-medium hover:bg-green-700 focus:ring-4 focus:outline-none"
            >
              Sign in
            </button>
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
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="grow-1 basis-0 order-2">

          </div>
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isMd ? "fit-content" : isOpen ? "12rem" : 0,
                paddingTop: isMd ? 0 : isOpen ? "calc(var(--spacing) * 4)" : 0,
                opacity: isMd ? 1 : isOpen ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={` w-full items-center justify-between overflow-hidden md:order-1 md:flex md:w-auto`}
              id="navbar-cta"
            >
              <ul className="border-appLayoutBorder grid gap-2 h-full grid-cols-1 rounded-lg p-0 font-medium md:mt-0 md:flex md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
                {NAV_LINKS.map((linkItem) => (
                  <li className="w-full overflow-hidden md:w-fit" key={linkItem.label}>
                    <Link
                      href={linkItem.link}
                      className="text-appLayoutText border md:border-0 text-lg md:text-lg border-appLayoutBorder md:text-appLayoutTextMuted md:hover:text-appLayoutText hover:bg-appLayoutInverseHover flex h-full items-center justify-start rounded-lg px-5 py-2 md:justify-center md:p-0 md:hover:bg-transparent"
                    >
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </nav>
    </motion.div>
  )
}
