// CustomDialog.tsx
import React, { ReactNode } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface CustomDialogProps {
 title: string;
 content: ReactNode;
 open: boolean;
 handleClose: () => void;
 handleAgree?: () => void;
 fullWidth?: boolean;
 maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
 fullScreen?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
 title,
 content,
 open,
 handleClose,
 handleAgree,
 fullWidth = true,
 maxWidth = "",
 fullScreen = false,
}) => {
 return (
  <Dialog
   open={open}
   onClose={handleClose}
   aria-labelledby="dialog-title"
   aria-describedby="dialog-description"
   maxWidth={maxWidth}
   fullWidth={fullWidth}
   fullScreen={fullScreen}
  >
   <DialogTitle id="dialog-title">{title}</DialogTitle>
   <DialogContent dividers>{content}</DialogContent>
   <DialogActions>
    <Button onClick={handleClose}>Disagree</Button>
    <Button onClick={handleAgree || handleClose} autoFocus>
     Save
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default CustomDialog;
