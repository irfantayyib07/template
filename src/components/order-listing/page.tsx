"use client";

import React, { useState, useEffect } from "react";
import OrderCard from "@/components/cards/order-card";

type Order = {
  orderTitle: string;
  employeeName: string;
  customerPrice: string;
  remainingAmount: string;
};

const OrderListing = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/orders.json");
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        marginTop: "20px",
      }}
    >
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderTitle={order.orderTitle}
          employeeName={order.employeeName}
          customerPrice={order.customerPrice}
          remainingAmount={order.remainingAmount}
        />
      ))}
    </div>
  );
};

export default OrderListing;
