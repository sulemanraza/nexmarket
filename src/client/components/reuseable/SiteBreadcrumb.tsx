import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/client/components/ui/breadcrumb";
import React, { FC } from "react";

interface props {
  links: { title: string; slug?: string }[];
}

export const SiteBreadcrumb: FC<props> = ({ links }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-xs md:text-sm" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map(({ title, slug }: any, index: number) => {
          if (!slug) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-xs md:text-sm">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xs md:text-sm" href={slug}>
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
