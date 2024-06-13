import React, { useState } from "react";
import { Card, CardContent, Typography, Chip, Box, Stack, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DropDown from "@/components/dropdown";
import CustomDialog from "../dialog";
import OrderForm from "@/components/forms/order-form";

type OrderCardProps = {
  orderTitle: string;
  employeeName: string;
  customerPrice: string;
  remainingAmount: string;
};

const OrderCard: React.FC<OrderCardProps> = props => {
  const { orderTitle, employeeName, customerPrice, remainingAmount } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const menuItems = [
    {
      label: "Insert order before",
      onClick: () => console.log("Insert order before"),
    },
    {
      label: "Insert order after",
      onClick: () => console.log("Insert order after"),
    },
    { label: "Duplicate order", onClick: () => console.log("Duplicate order") },
    { label: "Apply template", onClick: () => console.log("Apply template") },
    { label: "Expand order", onClick: () => console.log("Expand order") },
    { label: "Add comment", onClick: () => console.log("Add comment") },
    { label: "Copy order URL", onClick: () => console.log("Copy order URL") },
    { label: "Send order", onClick: () => console.log("Send order") },
    { label: "Delete order", onClick: () => console.log("Delete order") },
  ];

  return (
    <>
      <Card sx={{ position: "relative", maxWidth: 345, minWidth: 320, p: 2, m: 1 }}>
        <div className="order-card-dropdown">
          <DropDown buttonLabel=":" menuItems={menuItems} />
        </div>
        <CardContent sx={{ p: 0, cursor: "pointer" }} onClick={handleOpenDialog}>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            color="text.primary"
            fontWeight={500}
            sx={{ mb: 0 }}
          >
            {orderTitle}
          </Typography>
          <Stack>
            <Divider sx={{ mt: 2, mb: 3 }} />
          </Stack>
          <Stack gap={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Stack display="flex" flexDirection="row" alignItems="center">
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  EMPLOYEE NAME
                </Typography>
              </Stack>
              <Chip size="small" label={employeeName} color="primary" />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Stack display="flex" flexDirection="row" alignItems="center">
                <AttachMoneyIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  CUSTOMER PRICE
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.primary">
                {customerPrice}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Stack display="flex" flexDirection="row" alignItems="center">
                <MoneyOffIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  REMAINING $
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.primary">
                {remainingAmount}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <CustomDialog
        title="Create Order"
        content={<OrderForm {...props} mode="edit" />}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        fullWidth={true}
        fullScreen={false}
        maxWidth={false}
      />
    </>
  );
};

export default OrderCard;
