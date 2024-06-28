import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const PendingButton = ({
  labelText,
  className,
}: {
  className?: string;
  labelText: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={
        className ??
        "bg-brand w-full  min-w-[143px] h-14 hover:bg-brand hover:opacity-80"
      }
      disabled={pending}
      aria-disabled={pending}
    >
      {labelText}
    </Button>
  );
};
