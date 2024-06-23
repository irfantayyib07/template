// CustomDialog.tsx
import React, { ReactNode, forwardRef, useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface CustomDialogProps {
 title: string;
 content: ReactNode;
 open: boolean;
 handleClose: () => void;
 handleAgree?: () => void;
 fullWidth?: boolean;
 maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
 fullScreen?: boolean;
}

const CustomDialog = ({
 title,
 content,
 open,
 handleClose,
 maxWidth = false,
 fullWidth = true,
 fullScreen = false,
}: CustomDialogProps, ref) => {
 const handleClick = () => {
  ref.current.submit();
 };
 
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
    <Button onClick={handleClose}>Close</Button>
    <Button onClick={handleClick} autoFocus>
     Save
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default forwardRef<React.ReactNode, CustomDialogProps>(CustomDialog);
