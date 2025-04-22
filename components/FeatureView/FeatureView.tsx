"use client"

import { JSX } from "react"
import { GrainyDiv } from "components/GrainyDiv/GrainyDiv"
import { useAppStore } from "store/appStore"

export interface FeatureViewProps {
  features: Array<{ title: string; description: string; icon: JSX.Element }>
}

export function FeatureView(props: Readonly<FeatureViewProps>) {
  const { features } = props

  const setSelectedFeature = useAppStore((state) => state.setSelectedFeature)
  const selectedFeature = useAppStore((state) => state.selectedFeature)

  return (
    <>
      {features.map((singleItem, index) => {
        const active = selectedFeature === index

        return (
          <GrainyDiv
            key={singleItem.title}
            active={active}
            className="border-appLayoutBorder flex h-fit flex-col items-center justify-start gap-3 rounded-lg border text-center font-sans"
          >
            <button
              onClick={() => {
                setSelectedFeature(index)
              }}
              className="flex h-fit w-full flex-col items-center justify-start gap-3 px-4 pt-3 pb-5 text-center"
            >
              <header className="flex h-[2.8rem] w-full items-center justify-start gap-4">
                <div className="bg-appBackgroundAccent text-appLayoutText flex size-10 items-center justify-center rounded-full p-1.5 lg:size-12">
                  {singleItem.icon}
                </div>
                <div className={`text-appLayoutText w-fit items-center justify-start pb-px text-xl font-thin`}>
                  {singleItem.title}
                </div>
              </header>
              <div
                className={`text-appLayoutTextMuted overflow-x-ellipsis flex h-fit w-full items-center justify-start overflow-x-hidden pl-1 text-nowrap ${
                  active && "text-appBackground"
                }`}
              >
                {singleItem.description}
              </div>
            </button>
          </GrainyDiv>
        )
      })}
    </>
  )
}
