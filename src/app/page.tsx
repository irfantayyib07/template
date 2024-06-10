'use client';
import { useState } from 'react';
import CustomDialog from "@/components/dialog";
import { Button } from '@mui/material';
import CustomForm from "@/section/Forms/orderCreate";

export default function Home() {
    const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

 return (
  <>
    <Button variant="outlined" onClick={handleOpenDialog}>
          Open Custom Form Dialog
        </Button>
        <CustomDialog
          title="Create Order"
          content={<CustomForm />}
          open={dialogOpen}
          handleClose={handleCloseDialog}
          maxWidth='md'
        />
  </>
 );
}
