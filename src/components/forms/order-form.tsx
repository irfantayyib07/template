"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Typography, Grid, Chip, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import SingleSelect from "../single-select";
import MultipleSelectCheckmarks from "../multiple-select-checkmarks";
import { NAMES, FRESHFLOWER, PACKING, RECORDS } from "@/../public/data/order-form-data";
import * as Yup from "yup";
import BasicTextFields from "@/components/basic-text-fields";
import { Form, FormikProvider, useFormik } from "formik";

type RecordType = {
  name: string;
  price: string;
};

type OrderCardProps = {
  orderTitle?: string;
  employeeName?: string;
  customerPrice?: string;
  remainingAmount?: string;
  mode: "add" | "edit";
};

const OrderFormSchema = Yup.object().shape({
  orderTitle: Yup.string().required("Order Title is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  customerPrice: Yup.string().required("Customer Price is required"),
  remainingAmount: Yup.string().required("Remaining Amount is required"),
  selectedRecords: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required(),
        price: Yup.string().required(),
      }),
    )
    .min(1, "Select at least one record"),
  freshFlowerQuantity: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required(),
        price: Yup.string().required(),
      }),
    )
    .min(1, "Select at least one record"),
  packaging: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required(),
        price: Yup.string().required(),
      }),
    )
    .min(1, "Select at least one record"),
});

type OrderFormValues = Yup.InferType<typeof OrderFormSchema>;

const OrderForm = (
  { orderTitle, customerPrice, remainingAmount, employeeName, mode }: OrderCardProps,
  ref: React.Ref<any>,
) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik<OrderFormValues>({
    initialValues: {
      orderTitle: mode === "edit" ? orderTitle || "" : "",
      employeeName: mode === "edit" ? employeeName || "" : "",
      customerPrice: mode === "edit" ? customerPrice || "" : "",
      remainingAmount: mode === "edit" ? remainingAmount || "" : "",
      selectedRecords: [] as RecordType[],
      freshFlowerQuantity: [] as RecordType[],
      packaging: [] as RecordType[],
    },
    validationSchema: OrderFormSchema,
    onSubmit: values => {
      console.log(values);
      // Handle form submission
    },
    validateOnBlur: false,
  });

  useImperativeHandle(
    ref,
    () => ({
      errors: formik.errors,
      submit: () => submitButtonRef.current?.click(),
    }),
    [formik.errors],
  );

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit} className="h-full">
        <Grid container gap={2} sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }} className="h-full">
          <Grid container item columns={{ xs: 12, sm: 6 }} gap={3} className="h-full overflow-y-auto pr-5">
            <Grid item xs={12} container alignItems="center" className="mt-2">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Order Title
                </Typography>
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
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Employee Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <SingleSelect name="employeeName" label="Select the Name" options={NAMES} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Customer Price
                </Typography>
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
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Remaining
                </Typography>
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
                <Chip color="primary" label="Records Details" size="small" />
              </Divider>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Hard Goods ($)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MultipleSelectCheckmarks name="selectedRecords" label="Select Records" records={RECORDS} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Hard Goods Price
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Hard Goods Price"
                  value={`$${formik.values.selectedRecords?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Packaging ($)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MultipleSelectCheckmarks name="packaging" label="Select Packaging" records={PACKING} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Packing Price
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Packing Price"
                  value={`$${formik.values.packaging?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Fresh Flower qty ($)
                </Typography>
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
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Remaining
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Remaining"
                  value="5.00"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Quantity
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="From Fresh Flowers Quantity"
                  value={`$${formik.values.freshFlowerQuantity?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Price
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="(from Fresh Flowers) (from Fresh Flowers Quantity)"
                  value="5.00"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Flower Price
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Flower Price"
                  value="5.00"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid
            item
            container
            flexDirection="column"
            flexWrap="nowrap"
            columns={{ xs: 12, sm: 6 }}
            gap={3}
            className="h-full overflow-y-auto pr-5"
          >
            <Grid item>
              <Divider>
                <Chip color="primary" label="Order Preview " size="small" />
              </Divider>
            </Grid>
            {
              <Grid item>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Order Title"
                  value={formik.values.orderTitle || "---"}
                  className="mt-2"
                  fullWidth
                  size="small"
                />
              </Grid>
            }
            {
              <Grid item>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Employee Name"
                  value={formik.values.employeeName || "---"}
                  fullWidth
                  size="small"
                />
              </Grid>
            }

            {
              <Grid item container flexWrap="nowrap" gap={1}>
                <Grid item>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Customer Price"
                    value={formik.values.customerPrice || 0}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Greens"
                    value={`${(20 * +formik.values.customerPrice) / 100}`}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Wastage"
                    value={`${(10 * +formik.values.customerPrice) / 100}`}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            }

            {
              <Grid item>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Remaining Budget"
                  value={formik.values.remainingAmount || 0}
                  fullWidth
                  size="small"
                />
              </Grid>
            }

            {
              <Grid item display={"flex"}>
                <Typography variant="h6" whiteSpace={"nowrap"} sx={{ mr: 1 }}>
                  Hard Goods:{" "}
                </Typography>
                <Grid container gap={0.5}>
                  {formik.values?.selectedRecords?.length !== 0 ? (
                    formik.values?.selectedRecords?.map(record => (
                      <Grid item key={record.name}>
                        <Chip label={`${record.name} - $${record.price}`} size="small" />
                      </Grid>
                    ))
                  ) : (
                    <Chip label="---" size="small" />
                  )}
                </Grid>
              </Grid>
            }

            {
              <Grid item>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Total Hard Goods Price"
                  value={`$${formik.values.selectedRecords?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                  fullWidth
                  size="small"
                />
              </Grid>
            }

            {
              <Grid item display={"flex"}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  Packaging:
                </Typography>
                <Grid container gap={0.5}>
                  {formik?.values?.packaging?.length !== 0 ? (
                    formik?.values?.packaging?.map(record => (
                      <Grid item key={record.name}>
                        <Chip label={`${record.name} - $${record.price}`} size="small" />
                      </Grid>
                    ))
                  ) : (
                    <Chip label="---" size="small" />
                  )}
                </Grid>
              </Grid>
            }

            {
              <Grid item>
                <BasicTextFields
                  InputProps={{
                    readOnly: true,
                    notched: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Total Packaging Price"
                  value={`$${formik.values.packaging?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                  fullWidth
                  size="small"
                />
              </Grid>
            }

            {
              <Grid item display={"flex"}>
                <Typography variant="h6" whiteSpace={"nowrap"} sx={{ mr: 1 }}>
                  Fresh Flower Quantity:
                </Typography>
                <Grid container gap={0.5}>
                  {formik.values?.freshFlowerQuantity?.length !== 0 ? (
                    formik.values?.freshFlowerQuantity?.map(record => (
                      <Grid item key={record.name}>
                        <Chip label={`${record.name} - $${record.price}`} size="small" />
                      </Grid>
                    ))
                  ) : (
                    <Chip label="---" size="small" />
                  )}
                </Grid>
              </Grid>
            }

            {
              <Grid item container flexWrap="nowrap" gap={1}>
                <Grid item>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Total Fresh Flower Price"
                    value={`$${formik.values.freshFlowerQuantity?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Remaining"
                    value={"$5.00"}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Quantity"
                    value={"$5.00"}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            }

            {
              <Grid container flexWrap="nowrap" gap={1}>
                <Grid xs={12} md={6}>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Price"
                    value={"$5.00"}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <BasicTextFields
                    InputProps={{
                      readOnly: true,
                      notched: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="Flower Price"
                    value={"$5.00"}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>

        <Button type="submit" sx={{ display: "none" }} ref={submitButtonRef} />
      </Form>
    </FormikProvider>
  );
};

export default forwardRef<React.ReactNode, OrderCardProps>(OrderForm);
