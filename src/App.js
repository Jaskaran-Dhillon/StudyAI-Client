import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RequireAuth from "HOC/RequireAuth";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Dashboard from "views/Dashboard";
import Logout from "views/Logout";
import { DataContextProvider } from "context/DataProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "theme/Theme";
const theme = createTheme(Theme);

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <ThemeProvider theme={theme}>
      <DataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/dashboard" replace={true} />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default App;
