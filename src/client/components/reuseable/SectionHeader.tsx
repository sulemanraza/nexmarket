import React, { FC } from "react";

interface Props {
  title: string;
  heading: string;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  headerStyle?: string;
}

export const SectionHeader: FC<Props> = ({
  title,
  heading,
  headerChildren,
  headerStyle,
  children,
}) => {
  return (
    <div className="px-[3%] lg:container space-y-5 my-10">
      <div className="flex items-center gap-4">
        <div className="w-3 h-6 sm:w-[20px] sm:h-10 rounded-sm bg-brand"></div>
        <div className="font-semibold text-brand text-sm sm:text-[16px]">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={headerStyle ?? "flex items-center gap-4"}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            {heading}
          </h2>
          {headerChildren} {/* This is where the headerChildren are rendered */}
        </div>
      </div>
      {children} {/* This is where the children are rendered */}
    </div>
  );
};
