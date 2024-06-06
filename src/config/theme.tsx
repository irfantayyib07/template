"use client";

import { createTheme } from "@mui/material";
import React, { useEffect, useState, createContext, useContext } from "react";
import { Theme, ThemeProvider } from "@mui/material";

type Mode = "light" | "dark";

type ModeContextProviderProps = {
 children: React.ReactNode;
};

type ModeContextType = {
 toggleMode: () => void;
};

const ModeContext = createContext<ModeContextType | null>(null);

export default function ModeContextProvider({
 children,
}: ModeContextProviderProps) {
 const [mode, setMode] = useState<Mode>("dark");

 const theme = createTheme({
  palette: {
   mode: mode,
  }
 });

 const toggleMode = () => {
  if (mode === "light") {
   setMode("dark");
   window.localStorage.setItem("mode", "dark");
   document.documentElement.classList.add("dark");
  } else {
   setMode("light");
   window.localStorage.setItem("mode", "light");
   document.documentElement.classList.remove("dark");
  }
 };

 useEffect(() => {
  const localMode = window.localStorage.getItem("mode") as Mode | null;

  if (localMode) {
   setMode(localMode);

   if (localMode === "dark") {
    document.documentElement.classList.add("dark");
   }
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
   setMode("dark");
   document.documentElement.classList.add("dark");
  }
 }, []);

 return (
  <ModeContext.Provider
   value={{ toggleMode }}
  >
   <ThemeProvider
    theme={theme}
   >
    {children}
   </ThemeProvider>
  </ModeContext.Provider>
 );
}

export function useMode() {
 const context = useContext(ModeContext);

 if (context === null) {
  throw new Error("useMode must be used within a ModeContextProvider");
 }

 return context;
}