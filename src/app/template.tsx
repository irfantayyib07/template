"use client";

import { useMode } from "@/config/theme";
import { Button } from "@mui/material";
import React from "react";

function DashboardTemplate({ children }: { children: React.ReactNode; }) {
 const { toggleMode } = useMode();

 return (
  <>
   {children}
   <Button variant="contained" sx={{ inset: "auto 24px 24px auto", position: "fixed" }} onClick={toggleMode}>Toggle Mode</Button>
  </>
 );
}

export default DashboardTemplate;
