import { ComponentProps, ReactNode } from "react";

export const FormControl = (props: { children: ReactNode }) => (
  <div className="flex flex-col grow leading-none gap-3">{props.children}</div>
);

const Label = (props: ComponentProps<"label">) => (
  <label {...props} className="font-semibold" />
);

const Control = (props: { children: ReactNode }) => <div>{props.children}</div>;

const Description = (props: { children: ReactNode }) => (
  <p className="text-sm">{props.children}</p>
);

const Error = (props: { message?: string }) =>
  props.message ? (
    <p className="text-red-600 text-xs">{props.message}</p>
  ) : null;

FormControl.Label = Label;
FormControl.Control = Control;
FormControl.Description = Description;
FormControl.Error = Error;
