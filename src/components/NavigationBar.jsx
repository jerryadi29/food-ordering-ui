import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { logout } from "../features/authSlice";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const user = { userType: "customer" };
  //   const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartRestaurantId = useSelector(
    (state) => state.cart?.restaurantId || null
  );
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalCartItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  let pages = [];
  if (user) {
    if (user.userType == "customer") {
      pages = ["Dashboard"];
    } else {
      pages = ["Add Restaurant", "Dashboard"];
    }
  } else {
    pages = ["Log In", "SignUp (User)", "SignUp (Merchant)"];
  }

  let settings = [];
  if (user) {
    settings = ["Profile", "Account", "Logout"];
  }

  const handlePageClick = (page) => {
    handleCloseNavMenu();
    switch (page) {
      case "Dashboard":
        if (user.userType === "client") navigate("/client/dashboard");
        else if (user.userType === "merchant") navigate("/merchant/dashboard");
        break;
      case "Order Food":
        navigate("/client/orders");
        break;
      case "Add Restaurant":
        navigate("/merchants/restaurants/:id");
        break;
      case "Login":
        navigate("/login");
        break;
      case "Signup (Client)":
        navigate("/signup/client");
        break;
      case "Signup (Merchant)":
        navigate("/signup/merchant");
        break;
      default:
        break;
    }
  };


  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for larger screens */}
            <Typography
              variant="h6"
              noWrap
              //   component={<Home />}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Food 24/7
            </Typography>

            {/* Menu icon for mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo for mobile */}
            <Typography
              variant="h5"
              noWrap
              //   component={<Home />}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Food 24/7
            </Typography>

            {/* Navigation buttons for larger screens */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {pathname.localeCompare(
              `/customer/items/${cartRestaurantId}/order-status`
            ) === 0 ? (
              <></>
            ) : (
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={totalCartItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {/* User Avatar and Settings */}
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") handleLogout();
                        else {
                          // Handle other settings like Profile, Account, Dashboard if needed
                          // For simplicity, we'll navigate to dashboard
                          if (user.userType === "client")
                            navigate("/client/dashboard");
                          else if (user.userType === "merchant")
                            navigate("/merchant/dashboard");
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
