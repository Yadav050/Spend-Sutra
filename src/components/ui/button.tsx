import * as React from "react"
import styles from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`${styles.button} ${className || ''}`.trim()}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }