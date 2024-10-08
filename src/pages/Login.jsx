import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCredit,
  signinCustomer,
  signinMerchant,
} from "../features/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    name: null,
    password: null,
    userType: "customer",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (credentials.userType == "customer") {
        const resultAction = await signinCustomer({
          name: credentials.name,
          password: credentials.password,
          userType: credentials.userType,
        });
        dispatch(fetchCredit(resultAction.customerId));
        navigate("/customer-dashboard");
      } else {
        const resultAction = await signinMerchant({
          name: credentials.name,
          password: credentials.password,
        });
        navigate("/merchant-dashboard");
      }
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleUserTypeChange = (e) => {
    setCredentials({ ...credentials, userType: e.target.value });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "customer") {
        navigate("/customer-dashboard");
      } else if (parsedUser.role === "merchant") {
        navigate("/merchant-dashboard");
      }
    }
  }, [navigate]);

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Log In
          </Typography>
          {authError && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {authError}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">User Type</FormLabel>
              <RadioGroup
                row
                aria-label="userType"
                name="userType"
                value={credentials.userType}
                onChange={handleUserTypeChange}
              >
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
                />
                <FormControlLabel
                  value="merchant"
                  control={<Radio />}
                  label="Merchant"
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={authStatus === "loading"}
              sx={{ mt: 3, mb: 2 }}
            >
              {authStatus === "loading" ? (
                <CircularProgress size={24} />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Container>
    </>
  );
};
