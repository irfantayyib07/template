"use client";

import { createTheme } from "@mui/material";
import React, { useEffect, useState, createContext, useContext } from "react";
import { Theme, ThemeProvider } from "@mui/material";
import { Padding } from "@mui/icons-material";

type Mode = "light" | "dark";

type ModeContextProviderProps = {
 children: React.ReactNode;
};

type ModeContextType = {
 mode: Mode
 toggleMode: () => void
};

const ModeContext = createContext<ModeContextType | null>(null);

export default function ModeContextProvider({
 children,
}: ModeContextProviderProps) {
 const [mode, setMode] = useState<Mode>("dark");

 const theme = createTheme({
  palette: {
   mode: mode,
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
     fontSize: "2.5rem",
     fontWeight: 500,
    },
    h2: {
     fontSize: "2rem",
     fontWeight: 500,
    },
    h3: {
     fontSize: "1.75rem",
     fontWeight: 500,
    },
    h4: {
     fontSize: "1.5rem",
     fontWeight: 500,
    },
    h5: {
     fontSize: "1.25rem",
     fontWeight: 500,
    },
    h6: {
     fontSize: "1rem",
     fontWeight: 500,
    },
    body1: {
     fontSize: "1rem",
    },
    body2: {
     fontSize: "0.875rem",
    },
    button: {
     textTransform: "none",
    },
   },
  components: {
   MuiCssBaseline: {
    styleOverrides: (theme) => `
    body {
     background: ${theme.palette.background.default} !important;
     color: ${theme.palette.text.primary} !important;
    }
   `,
   },
   MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: 8,
          },
        },
      },
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
          },
        },
      },
      popupIndicator: {
        color: 'inherit', 
      },
    },
  },
   MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: 8,
          },
          '&:hover fieldset': {
          },
          '&.Mui-focused fieldset': {
          },
        },
      },
    },
  },
  },
 });

 const toggleMode = () => {
  if (mode === "light") {
   setMode("dark");
   window.localStorage.setItem("mode", "dark");
   // document.documentElement.classList.add("dark");
  } else {
   setMode("light");
   window.localStorage.setItem("mode", "light");
   // document.documentElement.classList.remove("dark");
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
   value={{ mode, toggleMode }}
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