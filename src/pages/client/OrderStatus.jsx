import {
  Chip,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  styled,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlacedOrder } from "../../features/customer/orderSlice";
import { getPlaceOrder } from "../../utils/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

export const OrderStatus = () => {
  const steps = ["Waiting to accepted","Accepted", "Ready", "Out for Delivery", "Deliverd"];
  const dispatch = useDispatch();
  const { orderId } = useParams();
  console.log("Order ID --> ", orderId)
  const orderStatus =useSelector((state) => state.order.status);
  const orderDetails = useSelector((state) => state.order.orderDetail);
  console.log("DEBUG NEW ORDER DETAIL",orderDetails) //undefined
  const totalOrderPrice = orderDetails?.orderItems?.reduce(
    (acc, item) => acc + item.itemTotalPrice,
    0
  );
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // Create an EventSource to subscribe to the backend's SSE
    const eventSource = new EventSource(`http://localhost:9090/food-ordering/users/order/status/subscribe/${orderId}`);

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data);
      setStatus(event.data); // Update the status in real time
    };

    eventSource.addEventListener("statusUpdate", (event) => {
      console.log("EVENT DATA -->",event.data);
      setStatus(event.data);
    });

    // Cleanup the EventSource when component unmounts
    return () => {
      eventSource.close();
    };
  }, [orderId]);

{/* Content */}
{orderStatus === "loading" && (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <CircularProgress />
  </Box>
)}

{orderStatus === "failed" && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {/* {itemsError} */}
  </Alert>
)}
  return (
    <>{orderStatus === "succeeded" &&  <Box sx={{ p: 4 }}>
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Order Detail: #{orderId}{" "}
          <Chip color="secondary" label="Order Status" variant="outlined" />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Order Items
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Total Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.orderItems.map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.itemQuantity}</TableCell>
                  <TableCell>{item.itemPrice}</TableCell>
                  <TableCell>{item.itemTotalPrice}</TableCell>
                </StyledTableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total</strong>
                </TableCell>
                <TableCell>{totalOrderPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  </Box>}</>
   
  );
};
