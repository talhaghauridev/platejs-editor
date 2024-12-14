"use client";
import React from "react";
import { GlobalContextProvider } from "./context/GlobalContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export default Provider;
