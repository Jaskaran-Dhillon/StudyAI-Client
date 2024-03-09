/* eslint-disable no-useless-escape */
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

//mui components
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//components
import Copyright from "components/Copyright";
//styles
import styles from "assets/jss/loginPageStyle";
import { makeStyles } from "@mui/styles";
import "./SignupPage.css";
import LoginImage from '../components/images/login_icon.png'; 

const useStyles = makeStyles(styles);

export default function SignupPage() {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const createUser = async (data) => {
    try {
      await authService.createUser(data);
      toast.success("Successfully created account.");
      navigate("/login");
    } catch (e) {
      console.warn(e);
      toast.error("Failed to create user.");
    }
  };

  const onSubmit = async (data) => {
    createUser(data);
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
        <h1 className="signup-header">Sign up</h1>
        
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
              defaultValue=""
              name="email"
              control={control}
              rules={{
                required: "Required field",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email",
                },
              }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  sx={{ width: "100%" }}
                  className="text-field"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
              defaultValue=""
              name="firstName"
              control={control}
              rules={{
                required: "Required field",
                maxLength: {
                  value: 50,
                  message: "Maximum length of 50 characters",
                },
              }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  sx={{ width: "100%" }}
                  className="text-field"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
              defaultValue=""
              name="lastName"
              control={control}
              rules={{
                required: "Required field",
                maxLength: {
                  value: 50,
                  message: "Maximum length of 50 characters",
                },
              }}
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
              defaultValue=""
              name="password"
              control={control}
              rules={{
                required: "Required field",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Must contain atleast 8 characters, 1 letter, 1 number, and a special character",
                },
              }}
            />
            <button
              type="submit"
              variant="contained"
              className="login-btn"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </button>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
