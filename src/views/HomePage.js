import * as React from "react";
import Container from "@mui/material/Container";
import Navbar from "../components/pages/NavBar.js";
import Hero from "../components/pages/Hero.js";

export default function HomePage() {
  return (
    <Container>
      <Navbar />
      <Hero />
    </Container>
  );
}
