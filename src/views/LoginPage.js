import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "store/actions/auth.action";

//mui components
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

//components
import Copyright from "components/Copyright";
import Grid from "@mui/material/Grid";

//styles
import styles from "assets/jss/loginPageStyle";
import { makeStyles } from "@mui/styles";
import "./SignupPage.css";
import LoginImage from '../components/images/login_icon.png'; 

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const authenticateUser = async (data) => {
    try {
      const result = await authService.login(data);
      dispatch(login(result.data));
      navigate("/dashboard");
    } catch (e) {
      console.warn(e);
      toast.error("Failed to authenticate user.");
    }
  };

  const onSubmit = (data) => {
    authenticateUser(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={LoginImage} alt="Login"/>
        <h1 className="signup-header">Sign in</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: 1 }}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  sx={{ width: "100%" }}
                  autoComplete="email"
                  className="text-field"
                />
              )}
              defaultValue=""
              name="email"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  sx={{ width: "100%" }}
                  autoComplete="password"
                  type="password"
                  className="text-field"
                />
              )}
              defaultValue=""
              name="password"
              control={control}
            />
            <button
              type="submit"
              variant="contained"
              className="login-btn"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className={classes.signUpLink}
                >
                  Don't have an account? Sign Up
                </p>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
