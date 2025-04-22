import { Metadata } from "next"
import { Button } from "components/Button/Button"

import { GrainyDiv } from "components/GrainyDiv/GrainyDiv"

import { LP_GRID_ITEMS } from "lp-items"
import { FeatureView } from "components/FeatureView/FeatureView"

export const metadata: Metadata = {
  title: "Tulip Writer",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://tulipwriter-website.vercel.app/",
    images: [
      
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="bg-appBackground">
        <div className="mx-auto grid max-w-(--breakpoint-lg) px-8 py-8 pb-1 text-start md:px-24 lg:py-16 lg:pb-2">
          <div className="mr-auto place-self-center">
            <h1 className="text-appLayoutText mb-4 max-w-2xl text-4xl leading-none font-light tracking-tight md:text-5xl xl:text-6xl">
              Tulip Writer
            </h1>
            <p className="text-appLayoutTextMuted mb-4 max-w-2xl px-1 font-light md:text-lg lg:mb-8 lg:text-xl">
              Write.
            </p>
          </div>
        </div>
        <div className="mx-auto mb-4 grid max-w-(--breakpoint-lg) gap-2 px-4 text-center md:grid-cols-3 md:px-12 lg:mb-8 lg:grid-cols-6">
          <Button href="#" className="col-span-2">
            Download for Windows
          </Button>
          <Button
            className=""
            href="#"
            intent="secondary"
          >
            MacOS
          </Button>
          <Button
            className=""
            href="#"
            intent="secondary"
          >
            Linux
          </Button>
          <Button
            className=""
            href="#"
            intent="secondary"
          >
            Android
          </Button>
          <Button
            className=""
            href="#"
            intent="secondary"
          >
            iOS
          </Button>
        </div>
      </section>
      <section className="bg-appBackground mb-4 px-4 md:px-12 lg:px-6">
        <div className="border-appLayoutBorder mx-auto max-w-(--breakpoint-xl) rounded-xl px-4 pt-4 pb-6 lg:px-6">
          <div className="mr-auto place-self-center">
            <h2 className="text-appLayoutText mb-5 max-w-2xl px-1 text-3xl leading-none font-light tracking-tight md:text-4xl xl:text-5xl">
              Features{" "}
            </h2>
          </div>
          <div className="justify-center space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3 lg:gap-6">
            <FeatureView features={LP_GRID_ITEMS} />
          </div>
        </div>
      </section>
    </>
  )
}
