import React, { useEffect, useState } from "react";

const OrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // Create an EventSource to subscribe to the backend's SSE
    const eventSource = new EventSource(`/order/status/subscribe/${orderId}`);

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data);
      setStatus(event.data); // Update the status in real time
    };

    eventSource.addEventListener("statusUpdate", (event) => {
      setStatus(event.data);
    });

    // Cleanup the EventSource when component unmounts
    return () => {
      eventSource.close();
    };
  }, [orderId]);

  return (
    <div>
      <h1>Order Status</h1>
      <p>Current Status: {status}</p>
    </div>
  );
};

export default OrderStatus;
