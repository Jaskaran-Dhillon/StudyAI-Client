import * as React from "react";
import Container from "@mui/material/Container";

import Navbar from "../components/pages/NavBar.js";
import Footer from "../components/pages/Footer.js";

export default function Dashboard() {
  return (
    <Container>
      <Navbar />
      <h1>Hello! You made it to the main page!</h1>
      <Footer />
    </Container>
  );
}
