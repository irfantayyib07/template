'use client';

import React from 'react';
import { Typography, Grid, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BasicTextFields from '@/components/basic-text-fields';
import MultiSelect from '@/components/multi-select';
import DynamicBox from '@/components/cards/basket-card';

type OrderCardProps = {
 orderTitle?: string;
 employeeName?: string;
 customerPrice?: string;
 remainingAmount?: string;
 mode: "add" | "edit";
};

const employeeOptions = [
 { label: 'Mark', color: '#ff8a80' },
 { label: 'John', color: '#ff80ab' },
 { label: 'Jane', color: '#b39ddb' },
];
const dynamicData = {
 title: "basket 1",
 price: 10.99,
 tags: ["tag1", "tag2", "tag3"],
};

const OrderForm: React.FC<OrderCardProps> = ({
 orderTitle,
 employeeName,
 customerPrice,
 remainingAmount,
 mode,
}) => {
 return (
  <>
   <Grid container gap={2} flexWrap="nowrap">
    <Grid container item sm={8} gap={2}>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Order Title</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields size="small" defaultValue={mode === "edit" ? orderTitle : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Employee Name</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <MultiSelect options={employeeOptions} label='' />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Customer Price</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields size="small" defaultValue={mode === "edit" ? customerPrice : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Remaining</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <BasicTextFields size="small" defaultValue={mode === "edit" ? remainingAmount : ""} fullWidth />
      </Grid>
     </Grid>
     <Grid item xs={12}>
      <Divider>
       <Chip label="Basket Details" size="small" />
      </Divider>
     </Grid>
     <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} sm={3}>
       <Typography variant="h6">Remaining</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
       <DynamicBox
        title={dynamicData.title}
        price={dynamicData.price}
        tags={dynamicData.tags}
        onClose={() => {
         // Handle close event
        }}
       />
      </Grid>
     </Grid>
    </Grid>

    {/* Sidebar */}
    <Grid item>
     <Divider orientation="vertical" />
    </Grid>

    <Grid item sm={4}>
     <DynamicBox
      title={dynamicData.title}
      price={dynamicData.price}
      tags={dynamicData.tags}
      onClose={() => {
       // Handle close event
      }}
     />
    </Grid>

   </Grid>
  </>
 );
};

export default OrderForm;
