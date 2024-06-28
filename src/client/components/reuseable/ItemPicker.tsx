"use client";
import React, { FC, useState } from "react";
import { Label } from "@/client/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/client/components/ui/radio-group";

interface props {
  items: string[];
  showLabel?: boolean;
}

export const ItemPicker: FC<props> = ({ items, showLabel = false }) => {
  const [selected, setSelected] = useState<string>(items[0]);

  const handleChange = (item: string) => {
    setSelected(item);
  };

  return (
    <RadioGroup className="flex items-center">
      {items.map((item, index) => (
        <div
          key={index}
          className={`
        flex items-center border-2 rounded-md ${
          selected === item ? "border-brand" : "border-gray-100"
        }`}
        >
          <RadioGroupItem
            value={item}
            onClick={() => handleChange(item)}
            id={item}
            className="hidden"
          />
          <Label
            title={item || "item"}
            className={`
              ${showLabel && "grid place-items-center p-2"}
              `}
            style={{
              width: showLabel ? "100%" : "30px",
              height: showLabel ? "auto" : "30px",
              borderRadius: "5px",
              backgroundColor: item,
              display: "block",
              border: "2px solid #fff",
              cursor: "pointer",
              opacity: selected === item ? 1 : 0.5,
            }}
            htmlFor={item}
          >
            {showLabel && <span>{item}</span>}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
