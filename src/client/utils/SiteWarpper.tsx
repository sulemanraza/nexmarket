"use client";
import ProviderWrapper from "./Provider";

interface Props {
  children: React.ReactNode;
}

const SiteWrapper = ({ children }: Props) => {
  return <ProviderWrapper>{children}</ProviderWrapper>;
};

export default SiteWrapper;
