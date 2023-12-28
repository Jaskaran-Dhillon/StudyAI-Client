import * as React from "react";
import Container from "@mui/material/Container";
import Navbar from "../components/pages/NavBar.js";
import Hero from "../components/pages/Hero.js";
import Content from "../components/pages/Content.js";
import Footer from "../components/pages/Footer.js";

export default function HomePage() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </Container>
  );
}
