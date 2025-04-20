"use client"

import { VariantProps } from "class-variance-authority"
import { motion, MotionValue, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring } from "motion/react"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { JsxElement } from "typescript"

export interface GrainyDivProps {
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  restingPos?: number
  gradientSize?: number
}

export function GrainyDiv(props: Readonly<GrainyDivProps>) {
  const { className, disabled = false, children, restingPos = 120, gradientSize = 120 } = props

  const grainyDivRef = useRef(null)

  const mouseX: MotionValue<number> = useMotionValue(restingPos)
  const mouseY: MotionValue<number> = useMotionValue(restingPos)

  const mouseXSpring: MotionValue<number> = useSpring(mouseX, { stiffness: 400, damping: 50 })
  const mouseYSpring: MotionValue<number> = useSpring(mouseY, { stiffness: 400, damping: 50 })

  const handleMouseMove = useCallback(({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    mouseX.set(((clientX - left) / width) * 100)
    mouseY.set(((clientY - top) / height) * 100)
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(restingPos)
    mouseY.set(restingPos)
  }, [])

  if (disabled) {
    mouseX.set(restingPos)
    mouseY.set(restingPos)
  }

  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseXSpring}% ${mouseYSpring}%, hsl(var(--appLayoutInverseHover)) 0%, #00000000 ${gradientSize}%)`

  return (
    <motion.div
      ref={grainyDivRef}
      onMouseMove={(args) => {
        if (disabled) return
        handleMouseMove(args)
      }}
      onMouseLeave={handleMouseLeave}
      className={`${className}`}
      style={{
        backgroundImage: spotlightBackground,
      }}
    >
      {children}
    </motion.div>
  )
}
