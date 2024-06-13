'use client';

import React, { useState } from 'react';
import { Typography, Grid, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BasicTextFields from '@/components/basic-text-fields';
import SingleSelect from '../single-select';
import MultipleSelectCheckmarks from '../multiple-select-checkmarks';


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
];

const records = [
    { name: 'Oliver Hansen', price: '$10' },
    { name: 'Van Henry', price: '$20' },
    { name: 'April Tucker', price: '$15' },
    { name: 'Ralph Hubbard', price: '$25' },
];
const packing = [
    { name: 'Cotton', price: '$10' },
    { name: 'Polyester', price: '$20' },
    { name: 'Wool', price: '$15' },
]
const freshFlower = [
    { name: 'rose', price: '$10' },
    { name: 'tulip', price: '$20' },
    { name: 'sunflower', price: '$15' },
]

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
                <Grid container item sm={5} gap={4}>
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
                            <Typography variant="h6">Hard Goods</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <MultipleSelectCheckmarks records={records} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Hard Goods Price</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="body1" color="text.primary">
                                $20.45
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Greens</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="Greens Price" defaultValue='20.45' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Packaging</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <MultipleSelectCheckmarks records={packing} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Packing Price</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="Packing Price" defaultValue='15.0' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Fresh Flower qty</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <MultipleSelectCheckmarks records={freshFlower} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Remaining</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="Remaining" defaultValue='5.00' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Quantity </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="From Fresh FLowers Quantity" defaultValue='5.00' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Price </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="(from Fresh Flowers) (from Fresh FLowers Quantity)" defaultValue='5.00' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Flower Price </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="Flower Price" defaultValue='5.00' fullWidth />
                        </Grid>                    
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Wastage </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <BasicTextFields 
                                InputProps={{
                                    readOnly: true, 
                                    notched: true,
                                }}
                                InputLabelProps ={{ shrink: true }} label="Wastage Ammount" defaultValue='8.00' fullWidth />
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
