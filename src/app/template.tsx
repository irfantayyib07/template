"use client";

import { useMode } from "@/config/theme";
import { Box, Button } from "@mui/material";
import React from "react";

function DashboardTemplate({ children }: { children: React.ReactNode; }) {
 const { toggleMode } = useMode();

 return (
  <>
   <Box bgcolor={"background.default"} color={"text.primary"}>
    {children}
   </Box>
   <Button variant="contained" sx={{ inset: "auto 24px 24px auto", position: "fixed" }} onClick={toggleMode}>Toggle Mode</Button>
  </>
 );
}

export default DashboardTemplate;
