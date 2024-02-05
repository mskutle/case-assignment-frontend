import { ComponentPropsWithRef, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<"input">
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full pl-6 py-[10px] pr-3 bg-[#FAF6FF] border border-[rgba(116, 36, 218, 0.05)]"
      {...props}
    />
  );
});

Input.displayName = "Input";
