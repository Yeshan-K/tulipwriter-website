"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div className="border-appLayoutBorder mx-auto flex h-fit max-w-(--breakpoint-xl) items-center justify-start rounded-xl border lg:px-4">
      <nav className="border-appLayoutBorder bg-appBackground w-full">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tulip Writer</span>
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-appLayoutText focus:ring-appLayoutBorder rounded-lg bg-green-900 px-4 py-2 text-center text-sm font-medium hover:bg-green-700 focus:ring-4 focus:outline-none"
            >
              Get started
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
          <div
            className={`${!isOpen && "hidden"} w-full items-center justify-between md:order-1 md:flex md:w-auto`}
            id="navbar-cta"
          >
            <ul className="border-appLayoutBorder mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
              <li>
                <Link
                  href="#"
                  className="text-appLayoutText hover:bg-appLayoutInverseHover block rounded-sm px-3 py-2 md:p-0 md:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}
