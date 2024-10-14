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
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlacedOrder } from "../../features/customer/orderSlice"; // Ensure this action exists
import { axiosInstance, getPlaceOrder } from "../../utils/api"; // Ensure this function exists

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
  const steps = [
    "Waiting to be Accepted",
    "Accepted",
    "Ready",
    "Out for Delivery",
    "Delivered",
  ];
  
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const orderStatus = useSelector((state) => state.order.status);
  const orderDetails = useSelector((state) => state.order.orderDetail);
  const totalOrderPrice = orderDetails?.orderItems?.reduce(
    (acc, item) => acc + item.itemTotalPrice,
    0
  );

  const [currentStep, setCurrentStep] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const intervalRef = useRef(null);  // Use useRef to store the interval ID
  const [showCancelledAlert, setShowCancelledAlert] = useState(false); // State for cancelled alert

  const fetchOrderStatus = async () => {
    try {
      const response = await axiosInstance.get(`users/order/status/${orderId}`);
      if (response) {
        setCurrentStep(response.data.status);

        // Check if the status is "Cancelled"
        if (response.data.status === "Cancelled") {
          setShowCancelledAlert(true);  // Show cancelled alert
          clearInterval(intervalRef.current);  // Stop the interval
        } else if (response.data.status === "Delivered") {
          clearInterval(intervalRef.current);  // Stop the interval
        }
      } else {
        setErrorMessage("Failed to fetch order status.");
      }
    } catch (error) {
      setErrorMessage("Error fetching order status.");
    }
  };

  useEffect(() => {
    // Fetch the initial order status
    fetchOrderStatus();

    // Set up polling
    intervalRef.current = setInterval(fetchOrderStatus, 5000);  // Store the interval ID in useRef

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [orderId]);

  if (orderStatus === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (orderStatus === "failed") {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage || "Failed to load order details."}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {orderStatus === "succeeded" && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Order Detail: #{orderId}{" "}
              <Chip color="secondary" label="Order Status" variant="outlined" />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stepper activeStep={steps.indexOf(currentStep)} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          {/* Show Cancelled Alert */}
          {showCancelledAlert && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Your order has been cancelled.
            </Alert>
          )}

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
      )}
    </Box>
  );
};
