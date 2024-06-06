import ModeContextProvider from "@/config/theme";
import React from "react";

function Providers({ children }: { children: React.ReactNode; }) {
 return (
  <>
   <ModeContextProvider>
    {children}
   </ModeContextProvider>
  </>
 );
}

export default Providers;
