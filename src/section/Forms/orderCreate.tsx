'use client';

import React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import BasicTextFields from '@/components/basicTextFields';
import FixedTags from '@/components/multiSelect';

const employeeOptions = [
  { label: 'Mark', color: '#ff8a80' },
  { label: 'John', color: '#ff80ab' },
  { label: 'Jane', color: '#b39ddb' },
];

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
            <FixedTags options={employeeOptions} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomForm;
