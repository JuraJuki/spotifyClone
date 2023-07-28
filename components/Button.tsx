import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      disabled,
      type = "button",
      ...restProps
    } = props;

    return (
      <button
        type={type}
        className={twMerge(
          `w-full
          rounded-full
          bg-green-500
          border
          border-transparent
          px-3
          py-3
          disabled:cursor-not-allowed
          disabled:opacity-50
          font-bold
          text-black
          hover:opacity-75
          transition`,
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
