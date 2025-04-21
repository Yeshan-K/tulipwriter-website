import { Metadata } from "next"
import { Button } from "components/Button/Button"

import { LP_GRID_ITEMS } from "lp-items"
import { GrainyDiv } from "components/GrainyDiv/GrainyDiv"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="bg-appBackground">
        <div className="mx-auto grid max-w-(--breakpoint-lg) px-4 py-8 pb-1 text-start lg:px-24 lg:py-16 lg:pb-2">
          <div className="mr-auto place-self-center">
            <h1 className="text-appLayoutText mb-4 max-w-2xl text-4xl leading-none font-light tracking-tight md:text-5xl xl:text-6xl">
              Tulip Writer
            </h1>
            <p className="text-appLayoutTextMuted mb-4 max-w-2xl font-light md:text-lg lg:mb-8 lg:text-xl">Write.</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-(--breakpoint-lg) lg:grid-cols-6 px-4 lg:px-12 gap-2 mb-4 lg:mb-8 text-center ">
          <Button href="https://github.com/Blazity/next-enterprise" className=" col-span-2">
            Download for Windows
          </Button>
          <Button
            className=""
            href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
            intent="secondary"
          >
            MacOS
          </Button>
          <Button
            className=""
            href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
            intent="secondary"
          >
            Linux
          </Button>
          <Button
            className=""
            href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
            intent="secondary"
          >
            Android
          </Button>
          <Button
            className=""
            href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
            intent="secondary"
          >
            iOS
          </Button>
        </div>
      </section>
      <section className="bg-appBackground">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <GrainyDiv
                key={singleItem.title}
                className="border-appLayoutBorder flex h-fit flex-col items-center justify-start gap-3 rounded-lg border px-4 pt-3 pb-5 text-center font-sans"
              >
                <header className="flex h-[2.8rem] w-full items-center justify-start gap-4">
                  <div className="bg-appBackgroundAccent text-appLayoutText flex size-10 items-center justify-center rounded-full p-1.5 lg:size-12">
                    {singleItem.icon}
                  </div>
                  <div className="text-appLayoutText w-fit items-center justify-start pb-px text-xl font-thin">
                    {singleItem.title}
                  </div>
                </header>
                <div className="text-appLayoutTextMuted overflow-x-ellipsis flex h-fit w-full items-center justify-start overflow-x-hidden pl-1 text-nowrap">
                  {singleItem.description}
                </div>
              </GrainyDiv>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
