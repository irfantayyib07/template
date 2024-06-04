import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DropDown from "@/app/components/dropdown";

type OrderCardProps = {
  orderTitle: string;
  employeeName: string;
  customerPrice: string;
  remainingAmount: string;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderTitle,
  employeeName,
  customerPrice,
  remainingAmount,
}) => {
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
    <Card
      sx={{ position: "relative", maxWidth: 345, minWidth: 320, p: 2, m: 1 }}
    >
      <div className="order-card-dropdown">
        <DropDown buttonLabel=":" menuItems={menuItems} />
      </div>
      <CardContent sx={{ p: 0 }}>
        <Typography gutterBottom variant="h6" component="div">
          {orderTitle}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            EMPLOYEE NAME
          </Typography>
        </Box>
        <Chip
          size="small"
          label={employeeName}
          color="primary"
          sx={{ mb: 2 }}
        />
        <Box display="flex" alignItems="center" mb={1}>
          <AttachMoneyIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            CUSTOMER PRICE
          </Typography>
        </Box>
        <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
          {customerPrice}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <MoneyOffIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            REMAINING $
          </Typography>
        </Box>
        <Typography variant="body1" color="text.primary">
          {remainingAmount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
