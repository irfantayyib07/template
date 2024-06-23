'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Typography, Grid, Chip, Button, Container } from '@mui/material';
import Divider from '@mui/material/Divider';
import SingleSelect from '../single-select';
import MultipleSelectCheckmarks from '../multiple-select-checkmarks';
import { NAMES, FRESHFLOWER, PACKING, RECORDS } from "@/../public/data/order-form-data";
import * as Yup from "yup";
import BasicTextFields from "@/components/basic-text-fields";
import { Form, FormikProvider, useFormik } from "formik";


type OrderCardProps = {
 orderTitle?: string;
 employeeName?: string;
 customerPrice?: string;
 remainingAmount?: string;
 mode: "add" | "edit";
};

const OrderFormSchema = Yup.object().shape({
 orderTitle: Yup.string().required('Order Title is required'),
 employeeName: Yup.string().required('Employee Name is required'),
 customerPrice: Yup.number().required('Customer Price is required'),
 remainingAmount: Yup.number().required('Remaining Amount is required'),
 selectedRecords: Yup.array().of(
  Yup.object({
   name: Yup.string().required(),
   price: Yup.string().required(),
  })
 ).min(1, 'Select at least one record'),
 freshFlowerQuantity: Yup.array().of(
  Yup.object({
   name: Yup.string().required(),
   price: Yup.string().required(),
  })
 ).min(1, 'Select at least one record'),
 packaging: Yup.array().of(
  Yup.object({
   name: Yup.string().required(),
   price: Yup.string().required(),
  })
 ).min(1, 'Select at least one record'),
});

type OrderFormValues = Yup.InferType<typeof OrderFormSchema>;

const OrderForm = ({
 orderTitle,
 customerPrice,
 remainingAmount,
 employeeName,
 mode,
}: OrderCardProps, ref) => {
 const submitButtonRef = useRef();

 const formik = useFormik({
  initialValues: {
   orderTitle: mode === 'edit' ? orderTitle : '',
   employeeName: mode === "edit" ? employeeName : '',
   customerPrice: mode === 'edit' ? customerPrice : '',
   remainingAmount: mode === 'edit' ? remainingAmount : '',
   selectedRecords: [],
   freshFlowerQuantity: [],
   packaging: [],
  },
  validationSchema: OrderFormSchema,
  onSubmit: (values) => {
   console.log(values);
   // Handle form submission
  },
  validateOnBlur: false,
  validateOnChange: false,
 });

 useImperativeHandle(ref, () => ({
  errors: formik.errors,
  submit: () => submitButtonRef.current.click(),
 }), [formik.errors]);

 return (
  <FormikProvider value={formik}>
   <Form onSubmit={formik.handleSubmit}>
    <Grid container gap={2} flexWrap="nowrap">
     <Grid container item sm={5} gap={4}>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Order Title</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         label="Order Name"
         name="orderTitle"
         value={formik.values.orderTitle}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         error={formik.touched.orderTitle && Boolean(formik.errors.orderTitle)}
         helperText={formik.touched.orderTitle && formik.errors.orderTitle}
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Employee Name</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <SingleSelect
         name="employeeName"
         label="Select the Name"
         options={NAMES}
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Customer Price</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         label="Total Budget"
         name="customerPrice"
         value={formik.values.customerPrice}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         error={formik.touched.customerPrice && Boolean(formik.errors.customerPrice)}
         helperText={formik.touched.customerPrice && formik.errors.customerPrice}
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Remaining</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         label="Remaining Budget"
         name="remainingAmount"
         value={formik.values.remainingAmount}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         error={formik.touched.remainingAmount && Boolean(formik.errors.remainingAmount)}
         helperText={formik.touched.remainingAmount && formik.errors.remainingAmount}
         fullWidth
        />
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
        <MultipleSelectCheckmarks
         name="selectedRecords"
         label="Select Records"
         records={RECORDS}
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Hard Goods Price</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         InputProps={{
          readOnly: true,
          notched: true,
         }}
         InputLabelProps={{ shrink: true }}
         label="Hard Goods Price"
         defaultValue="20.45"
         fullWidth
        />
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
         InputLabelProps={{ shrink: true }}
         label="Greens Price"
         defaultValue="20.45"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Packaging</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <MultipleSelectCheckmarks
         name="packaging"
         label="Select Packaging"
         records={PACKING}
        />
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
         InputLabelProps={{ shrink: true }}
         label="Packing Price"
         defaultValue="15.0"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Fresh Flower qty</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <MultipleSelectCheckmarks
         name="freshFlowerQuantity"
         label="Select Flower Quantity"
         records={FRESHFLOWER}
        />
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
         InputLabelProps={{ shrink: true }}
         label="Remaining"
         defaultValue="5.00"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Quantity</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         InputProps={{
          readOnly: true,
          notched: true,
         }}
         InputLabelProps={{ shrink: true }}
         label="From Fresh Flowers Quantity"
         defaultValue="5.00"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Price</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         InputProps={{
          readOnly: true,
          notched: true,
         }}
         InputLabelProps={{ shrink: true }}
         label="(from Fresh Flowers) (from Fresh Flowers Quantity)"
         defaultValue="5.00"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Flower Price</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         InputProps={{
          readOnly: true,
          notched: true,
         }}
         InputLabelProps={{ shrink: true }}
         label="Flower Price"
         defaultValue="5.00"
         fullWidth
        />
       </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center">
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">Wastage</Typography>
       </Grid>
       <Grid item xs={12} sm={9}>
        <BasicTextFields
         InputProps={{
          readOnly: true,
          notched: true,
         }}
         InputLabelProps={{ shrink: true }}
         label="Wastage Amount"
         defaultValue="8.00"
         fullWidth
        />
       </Grid>
      </Grid>
     </Grid>
     {/* Sidebar */}
     <Grid item>
      <Divider orientation="vertical" />
     </Grid>

     <Grid item container flexDirection="column" sm={7} gap={2}>
      {formik.values.orderTitle && <Grid item><Typography variant="body2" sx={{ mb: "5px" }}>Order Title</Typography>
       <Chip label={formik.values.orderTitle} size="small" /></Grid>}
      {formik.values.employeeName && <Grid item><Typography variant="body2" sx={{ mb: "5px" }}>Employee Name</Typography>
       <Chip label={formik.values.employeeName} size="small" /></Grid>}
      {formik.values.customerPrice && <Grid item><Typography variant="body2" sx={{ mb: "5px" }}>Customer</Typography>
       <Chip label={formik.values.customerPrice} size="small" /></Grid>}

      {formik.values.selectedRecords.length !== 0 && <Grid item>
       <Typography variant="body2" sx={{ mb: "5px" }}>Hard Goods</Typography>
       <Grid container gap={.5}>
        {formik.values.selectedRecords.map(record => (
         <Grid item>
          <Chip label={`${record.name} - ${record.price}`} size="small" />
         </Grid>
        ))}
       </Grid>
      </Grid>}

      {formik.values.packaging.length !== 0 && <Grid item>
       <Typography variant="body2" sx={{ mb: "5px" }}>Packaging</Typography>
       <Grid container gap={.5}>
        {formik.values.packaging.map(record => (
         <Grid item>
          <Chip label={`${record.name} - ${record.price}`} size="small" />
         </Grid>
        ))}
       </Grid>
      </Grid>}

      {formik.values.freshFlowerQuantity.length !== 0 && <Grid item>
       <Typography variant="body2" sx={{ mb: "5px" }}>Fresh Flower Quantity</Typography>
       <Grid container gap={.5}>
        {formik.values.freshFlowerQuantity.map(record => (
         <Grid item>
          <Chip label={`${record.name} - ${record.price}`} size="small" />
         </Grid>
        ))}
       </Grid>
      </Grid>}
     </Grid>
    </Grid>

    <Button type="submit" sx={{ display: "none" }} ref={submitButtonRef} />
   </Form>
  </FormikProvider>
 );
};

export default forwardRef<React.ReactNode, OrderCardProps>(OrderForm);
