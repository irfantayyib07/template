import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
 palette: {
  primary: {
   main: "#556cd6",
  },
  secondary: {
   main: "#19857b",
  },
  error: {
   main: red.A400,
  },
  warning: {
   main: "#ff9800",
  },
  info: {
   main: "#2196f3",
  },
  success: {
   main: "#4caf50",
  },
  background: {
   default: "#f5f5f5",
  },
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
 shape: {
  borderRadius: 8,
 },
 spacing: 8,
 components: {
  MuiButton: {
   styleOverrides: {
    root: {
     borderRadius: 8,
    },
    containedPrimary: {
     backgroundColor: "#556cd6",
     "&:hover": {
      backgroundColor: "#4053af",
     },
    },
    containedSecondary: {
     backgroundColor: "#19857b",
     "&:hover": {
      backgroundColor: "#14695e",
     },
    },
   },
  },
  MuiAppBar: {
   styleOverrides: {
    root: {
     boxShadow: "none",
    },
   },
  },
  MuiPaper: {
   styleOverrides: {
    root: {
     padding: "16px",
    },
   },
  },
  MuiInputBase: {
   styleOverrides: {
    root: {
     borderRadius: 8,
     backgroundColor: "#fff",
    },
   },
  },
 },
});

export default theme;
