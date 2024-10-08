import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantDetails,
  addRestaurantDetails,
} from "../../features/merchant/merchantMenuDetailSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Button,
  Toolbar,
  Typography,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Comparator function for sorting
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// Sorting the array based on comparator
const sortedRows = (rows, comparator) => {
  console.log("CURRENT ROWS",rows);
  const stabilizedRows = rows.map((el, index) => [el, index]);
  stabilizedRows.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRows.map((el) => el[0]);
};

export const RestuarantMenuDetail = () => {
  const { restaurantId } = useParams(); // Get the merchant id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("itemName");
  const [openDialog, setOpenDialog] = useState(false);
  const { details, loading, error } = useSelector((state) => state.merchantMenuDetail);
  const [editRows, setEditRows] = useState({});
  const [isConfirmedEdit, setIsConfirmedEdit] = useState(false);

  const rows = details;

  useEffect(() => {
    if (restaurantId) {
      dispatch(getRestaurantDetails(restaurantId));
    }
    setEditRows({});
  }, [restaurantId, isConfirmedEdit, dispatch]);

  // Handle sorting request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle checkbox selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Function to handle field changes
  const handleFieldChange = (id, field, event) => {
    let value = event.target.value;
    setEditRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleConfirmAction = () => {
    const updatedRestaurantData = details.map((eachItem) => {
      if (eachItem.id === parseInt(Object.keys(editRows)[0])) {
        return { ...eachItem, ...Object.values(editRows)[0] };
      }
      return eachItem;
    });
    dispatch(addRestaurantDetails(updatedRestaurantData));
    dispatch(getRestaurantDetails(restaurantId));
    handleCloseDialog();
    setIsConfirmedEdit(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Memoize sorted rows
  const memoizedRows = useMemo(
    () => sortedRows(rows, getComparator(order, orderBy)),
    [rows, order, orderBy]
  );
  return (
    <>
      <Paper>
        <Toolbar>
          <Button
            startDecorator={<ArrowBackIosIcon />}
            color="danger"
            onClick={() => navigate(`${location.state?.from}`)}
          >
            Back
          </Button>
          {selected.length > 0 && (
            <Typography
              variant="subtitle1"
              color="inherit"
              component="div"
              style={{ flexGrow: 1 }}
            >
              {selected.length} selected
            </Typography>
          )}
          {selected.length > 0 && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenDialog}
            >
              Confirm Action
            </Button>
          )}
        </Toolbar>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#42a5f5" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "itemName"}
                    direction={orderBy === "itemName" ? order : "asc"}
                    onClick={() => handleRequestSort("itemName")}
                  >
                    Item Name
                    {orderBy === "itemName" ? (
                      <span style={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "price"}
                    direction={orderBy === "price" ? order : "asc"}
                    onClick={() => handleRequestSort("price")}
                  >
                    Price in Rs
                    {orderBy === "price" ? (
                      <span style={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Additional Customizations</TableCell>
                <TableCell>Quantity Available</TableCell>
                <TableCell>Available Time</TableCell>
                <TableCell>Max Quantity Per Order</TableCell>
                <TableCell>Available</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {memoizedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow key={row.id} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleClick(row.id)}
                        />
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.itemName}
                            onChange={(e) =>
                              handleFieldChange(row.id, "itemName", e)
                            }
                            fullWidth
                          />
                        ) : (
                          row.itemName
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.price}
                            onChange={(e) =>
                              handleFieldChange(row.id, "price", e)
                            }
                            fullWidth
                          />
                        ) : (
                          row.price
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.description}
                            onChange={(e) =>
                              handleFieldChange(row.id, "description", e)
                            }
                            fullWidth
                          />
                        ) : (
                          row.description
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.additionalCustomizations}
                            onChange={(e) =>
                              handleFieldChange(
                                row.id,
                                "additionalCustomizations",
                                e
                              )
                            }
                            fullWidth
                          />
                        ) : (
                          row.additionalCustomizations
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.quantityAvailable}
                            onChange={(e) =>
                              handleFieldChange(row.id, "quantityAvailable", e)
                            }
                            fullWidth
                          />
                        ) : (
                          row.quantityAvailable
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.availableTime}
                            onChange={(e) =>
                              handleFieldChange(row.id, "availableTime", e)
                            }
                            fullWidth
                          />
                        ) : (
                          row.availableTime
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.maxQuantityPerOrder}
                            onChange={(e) =>
                              handleFieldChange(
                                row.id,
                                "maxQuantityPerOrder",
                                e
                              )
                            }
                            fullWidth
                          />
                        ) : (
                          row.maxQuantityPerOrder
                        )}
                      </TableCell>
                      <TableCell>
                        {isItemSelected ? (
                          <TextField
                            value={editRows[row.id]?.available}
                            onChange={(e) =>
                              handleFieldChange(row.id, "available", e)
                            }
                            fullWidth
                          />
                        ) : row.available.toString() === "true" ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Confirmation Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm {selected.length} selected rows?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
