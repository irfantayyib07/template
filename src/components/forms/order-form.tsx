'use client';

import React, { useState } from 'react';
import { Typography, Grid, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BasicTextFields from '@/components/basic-text-fields';
import SingleSelect from '../single-select';


type OrderCardProps = {
 orderTitle?: string;
 employeeName?: string;
 customerPrice?: string;
 remainingAmount?: string;
 mode: "add" | "edit";
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

const OrderForm: React.FC<OrderCardProps> = ({
 orderTitle,
 customerPrice,
 remainingAmount,
 mode,
}) => {
    const [selectedName, setSelectedName] = useState<string>("");

    
  const handleNameChange = (value: string) => {
    setSelectedName(value);
  };

 return (
  <>
   <Grid container gap={2} flexWrap="nowrap">
    <Grid container item sm={5} gap={2}>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Order Title</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields label="Order Name" defaultValue={mode === "edit" ? orderTitle : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Employee Name</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
      <SingleSelect
                options={names}
                label="Select the Name"
              />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Customer Price</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields label="Total Budget" defaultValue={mode === "edit" ? customerPrice : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Remaining</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields label="Remaining Budget" defaultValue={mode === "edit" ? remainingAmount : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12}>
      <Divider>
       <Chip label="Records Details" size="small" />
      </Divider>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Record</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       
      </Grid>
     </Grid>
    </Grid>

    {/* Sidebar */}
    <Grid item >
     <Divider orientation="vertical" />
    </Grid>

    <Grid item sm={7}>
     
    </Grid>

   </Grid>
  </>
 );
};

export default OrderForm;
