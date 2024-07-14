"use client";
import { Button } from "../ui/button";

export const PrintButton = () => {
  return (
    <Button className="print-btn" onClick={() => print()}>
      Print
    </Button>
  );
};
