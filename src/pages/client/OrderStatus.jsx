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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const orderDetail = useSelector((state) => state.order.orderDetail);

  const totalOrderPrice = orderDetail.orderItems.reduce(
    (acc, item) => acc + item.itemTotalPrice,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
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
                {orderDetail.orderItems.map((item, index) => (
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
    </Box>
  );
};
