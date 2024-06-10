'use client';

import React from 'react';
import { Typography, Grid, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BasicTextFields from '@/components/basicTextFields';
import MultiSelect from '@/components/multiSelect';
import DynamicBox from '@/components/cards/basketCard';

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

const CustomForm: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Order Title</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <BasicTextFields size="small" defaultValue="Mark Flowers" fullWidth />
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
          <BasicTextFields size="small" defaultValue="48.52" fullWidth />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Remaining</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
          <BasicTextFields size="small" defaultValue="28.52" fullWidth />
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
    </>
  );
};

export default CustomForm;
