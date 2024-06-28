"use client";
import { SessionProvider } from "next-auth/react";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import store from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const ProviderWrapper = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default ProviderWrapper;
