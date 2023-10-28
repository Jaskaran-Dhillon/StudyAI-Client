import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "store/actions/auth.action";

//mui components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//components
import Copyright from "components/Copyright";
import Grid from "@mui/material/Grid";

//styles
import styles from "assets/jss/loginPageStyle";
import { makeStyles } from "@mui/styles";

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: 1 }}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  fullWidth
                  autoComplete="email"
                  className={classes.emailInput}
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
                  fullWidth
                  autoComplete="password"
                  type="password"
                />
              )}
              defaultValue=""
              name="password"
              control={control}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
