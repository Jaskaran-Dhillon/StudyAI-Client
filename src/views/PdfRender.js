import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import Navbar from "../components/pages/NavBar.js";
import Footer from "../components/pages/Footer.js";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import "./PdfRender.css";

const PdfRender = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pdfUrl = searchParams.get('pdfUrl');

  if (!pdfUrl) {
    return <div>No PDF Available</div>;
  }

  const handleNavigate = (path) => {  
    navigate(path);
  };

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    anchor.download = 'Summarized_Notes.pdf';
    anchor.click();
  };

  return (
    <Container>
      <Navbar />
    
      <div className="button-container">
        <button className="back-to-dashboard-btn" onClick={() => handleNavigate("/dashboard")}>Back to Dashboard</button>
        <button className="download-btn"  onClick={handleDownload}>Download Notes</button>
      </div>

      <div style={{ border: '1px solid rgba(0, 0, 0, 0.15)', borderRadius: '10px', height: '100%', overflow: 'auto', marginTop: '2rem' }}>

        {/* Render the PDF */}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      
      </div>
      <Footer />
    </Container>
  );
};

export default PdfRender;
