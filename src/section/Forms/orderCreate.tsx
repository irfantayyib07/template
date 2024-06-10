'use client';

import React from 'react';
import BasicTextFields from '@/components/basicTextFields';
import { Box, TextField, Typography, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CustomForm: React.FC = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Order Title</Typography>
                    <BasicTextFields defaultValue="Mark Flowers" size="small" />
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Employee Name</Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <FormControl fullWidth>
                        <Select defaultValue="">
                            <MenuItem value="Mark">Mark</MenuItem>
                            <MenuItem value="John">John</MenuItem>
                            <MenuItem value="Jane">Jane</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Customer Price" defaultValue="$125.00" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Remaining $" defaultValue="$110.00" />
                </Grid>
               
            </Grid>
        </Box>
    );
};

export default CustomForm;
