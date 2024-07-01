"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import MultipleSelectCheckmarks from "../multiple-select-checkmarks";
import { NAMES, FRESHFLOWER, PACKING, RECORDS } from "@/../public/data/order-form-data";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TitleIcon from "@mui/icons-material/Title";
import { Typography, Grid, Chip, Button } from "@mui/material";
import BasicTextFields from "@/components/basic-text-fields";
import { Form, FormikProvider, useFormik } from "formik";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SingleSelect from "../single-select";
import Card from "@mui/material/Card";
import * as Yup from "yup";
import { Diversity1 } from "@mui/icons-material";

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
function calculateRemainingAmount(operands: OrderFormValues) {
  const { customerPrice, selectedRecords, packaging, freshFlowerQuantity } = operands;
  const selectedRecordsTotal =
    selectedRecords?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0) || 0;
  const packagingTotal = packaging?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0) || 0;
  const freshFlowerQuantityTotal =
    freshFlowerQuantity?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0) || 0;
  const greensTotal = (10 * +customerPrice) / 100;
  const wastageTotal = (20 * +customerPrice) / 100;

  const remainingAmount =
    +customerPrice -
    (selectedRecordsTotal + packagingTotal + freshFlowerQuantityTotal + greensTotal + wastageTotal);

  return remainingAmount;
}

const OrderFormSchema = Yup.object().shape({
  orderTitle: Yup.string().required("Order Title is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  customerPrice: Yup.string().required("Customer Price is required"),
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
  { orderTitle, customerPrice, employeeName, mode }: OrderCardProps,
  ref: React.Ref<any>,
) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formik = useFormik<OrderFormValues>({
    initialValues: {
      orderTitle: mode === "edit" ? orderTitle || "" : "",
      employeeName: mode === "edit" ? employeeName || "" : "",
      customerPrice: mode === "edit" ? customerPrice?.replace("$", "") || "" : "",
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
          <Grid
            container
            item
            columns={{ xs: 12, sm: 6 }}
            gap={2}
            className="h-full overflow-y-auto scrollable-container"
            px={1}
          >
            <Grid item xs={12} container alignItems="center" className="mt-3" height={"fit-content"}>
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
            <Grid item xs={12} container alignItems="center" height={"fit-content"}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Employee Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <SingleSelect name="employeeName" label="Select the Name" options={NAMES} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center" height={"fit-content"}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Customer Budget
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <BasicTextFields
                  label="Total Budget (USD)"
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

            <Grid item xs={12} height={"fit-content"}>
              <Divider>
                <Chip color="primary" label="Records Details" size="small" />
              </Divider>
            </Grid>
            <Grid item xs={12} container alignItems="center" height={"fit-content"}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Hard Goods ($)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MultipleSelectCheckmarks name="selectedRecords" label="Select Records" records={RECORDS} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center" height={"fit-content"}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "initial" } }}>
                  Packaging ($)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MultipleSelectCheckmarks name="packaging" label="Select Packaging" records={PACKING} />
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center" height={"fit-content"}>
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
          </Grid>

          {/* Sidebar */}
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid
            container
            flexDirection="column"
            flexWrap="nowrap"
            justifyContent="start"
            columns={{ xs: 12, sm: 6 }}
            gap={2}
            className="scrollable-container overflow-y-auto"
            paddingBottom={1}
            px={1}
          >
            <Divider>
              <Chip color="primary" label="Records Preview" size="small" />
            </Divider>
            <Grid container spacing={2}>
              <Grid item xs={6} lg={4}>
                <Card sx={{ height: "100%", display: "flex" }}>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 16, mb: 1.5 }} color="text.secondary">
                      Order Title
                    </Typography>
                    <Typography color="text.primary">{formik.values.orderTitle || "---"}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} lg={4}>
                <Card sx={{ height: "100%", display: "flex" }}>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 16, mb: 1.5 }} color="text.secondary" gutterBottom>
                      <AccountCircleIcon /> Employee Name
                    </Typography>
                    <Typography color="text.primary">{formik.values.employeeName || "---"}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 16, mb: 1.5 }} color="text.secondary" gutterBottom>
                      <AccountBalanceWalletIcon /> Customer Budget
                    </Typography>
                    <Grid container>
                      <Grid xs={12}>
                        <Typography color="text.primary" display="flex" gap={1}>
                          <>Total:</>
                          <b>${formik.values.customerPrice}</b>
                        </Typography>
                      </Grid>
                      <Grid xs={12}>
                        <Typography color="text.primary" display="flex" gap={1}>
                          <>Remaining:</>
                          <b>${calculateRemainingAmount(formik.values)}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Divider>
              <Chip color="primary" label="Records Details" size="small" />
            </Divider>
            <Grid container spacing={2}>
              <Grid item xs={6} lg={4}>
                <Card>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Stack>
                      <Typography color="text.secondary">
                        <LocalFloristIcon /> Green:
                      </Typography>
                    </Stack>
                    <Stack textAlign={"right"}>
                      <Typography color="text.primary">
                        <b>${(20 * +formik.values.customerPrice) / 100}</b>
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} lg={4}>
                <Card>
                  <CardContent>
                    <Stack>
                      <Typography color="text.secondary">
                        <DeleteSweepOutlinedIcon /> Wastage:
                      </Typography>
                    </Stack>
                    <Stack textAlign={"right"}>
                      <Typography color="text.primary">
                        <b>${(10 * +formik.values.customerPrice) / 100}</b>
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container display={"flex"}>
              <Grid xs={12}>
                <Card>
                  <CardContent>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                      <Typography color="text.secondary" mb={2}>
                        <CategoryOutlinedIcon /> Hard Goods:
                      </Typography>
                      <Stack textAlign={"right"} flexDirection={"row"} justifyContent={"end"}>
                        <div>
                          Total:{" "}
                          <b>{` $${formik.values.selectedRecords?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}</b>{" "}
                          {`(${formik.values.selectedRecords?.length} selected)`}
                        </div>
                      </Stack>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                      {formik.values?.selectedRecords?.length !== 0 ? (
                        formik.values?.selectedRecords?.map(record => (
                          <div key={record.name}>
                            <Chip label={`${record.name} - $${record.price}`} size="small" />
                          </div>
                        ))
                      ) : (
                        <Chip label="---" size="small" />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container display={"flex"}>
              <Grid xs={12}>
                <Card>
                  <CardContent>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                      <Typography color="text.secondary" mb={2}>
                        <CardGiftcardOutlinedIcon /> Packing:
                      </Typography>
                      <Stack textAlign={"right"} flexDirection={"row"} justifyContent={"end"}>
                        <div>
                          Total:{" "}
                          <b>{` $${formik.values.packaging?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}</b>{" "}
                          {`(${formik.values.packaging?.length} selected)`}
                        </div>
                      </Stack>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                      {formik?.values?.packaging?.length !== 0 ? (
                        formik?.values?.packaging?.map(record => (
                          <div key={record.name}>
                            <Chip label={`${record.name} - $${record.price}`} size="small" />
                          </div>
                        ))
                      ) : (
                        <Chip label="---" size="small" />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container display={"flex"}>
              <Grid xs={12}>
                <Card>
                  <CardContent>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                      <Typography color="text.secondary" mb={2}>
                        <YardOutlinedIcon /> Fresh Flower Quantity:
                      </Typography>
                      <Stack textAlign={"right"} flexDirection={"row"} justifyContent={"end"}>
                        <div>
                          Total:{" "}
                          <b>{` $${formik.values.freshFlowerQuantity?.reduce((acc, obj) => +obj.price.replace("$", "") + acc, 0)}`}</b>{" "}
                          {`(${formik.values.freshFlowerQuantity?.length} selected)`}
                        </div>
                      </Stack>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={1}>
                      {formik.values?.freshFlowerQuantity?.length !== 0 ? (
                        formik.values?.freshFlowerQuantity?.map(record => (
                          <div key={record.name}>
                            <Chip label={`${record.name} - $${record.price}`} size="small" />
                          </div>
                        ))
                      ) : (
                        <Chip label="---" size="small" />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Button type="submit" sx={{ display: "none" }} ref={submitButtonRef} />
      </Form>
    </FormikProvider>
  );
};

export default forwardRef<React.ReactNode, OrderCardProps>(OrderForm);
