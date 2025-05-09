import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-appLayoutBorder",
    "transition-colors",
    "delay-50",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-appBackground", "text-white", "hover:enabled:bg-appLayoutInverseHover"],
        secondary: ["bg-transparent", "text-appLayoutText", "hover:enabled:bg-appLayoutInverseHover", "hover:enabled:text-white"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
}

export function Button(props: Readonly<ButtonProps>) {
  const { className, intent, size, underline, children, ...rest } = props;
  
  return (
    <a className={twMerge(button({ intent, size, className, underline }))} {...rest}>
      {children}
    </a>
  )
}