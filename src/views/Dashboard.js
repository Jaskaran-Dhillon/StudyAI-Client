import * as React from "react";
import Container from "@mui/material/Container";
import Navbar from "../components/pages/NavBar.js";
import Footer from "../components/pages/Footer.js";
import FileUpload from "../components/pages/FileUpload.js";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <Container>
      <Navbar />
      
      <div className="dashboard-header">
        <h1 className="dashboard-header-title">File to Notes</h1>
        <h2 className="dashboard-header-text">Upload your file, choose a preset, and get your summarized notes.</h2>
      </div>

      <FileUpload />
      <Footer />
    </Container>
  );
}
