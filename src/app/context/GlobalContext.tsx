"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import React from "react";
interface GlobalContextType {
  content: string;
  setContent: (content: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
