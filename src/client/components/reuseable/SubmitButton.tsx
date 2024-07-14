"use client";
import { useFormStatus } from "react-dom";

interface Props {
  text: string;
  className?: string;
}

export function SubmitButton({ text, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className ?? ""}>
      {text} {pending && "..."}
    </button>
  );
}
