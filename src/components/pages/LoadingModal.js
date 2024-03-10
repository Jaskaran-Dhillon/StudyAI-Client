import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import '../LoadingModal.css'; // Import CSS file for styling

const LoadingModal = () => {
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);
    const loadingTexts = ['Summarizing file', 'Processing data', 'Extracting highlights'];

    useEffect(() => {
        // Function to switch between words every 1.5 seconds
        const interval = setInterval(() => {
            setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
        }, 1500);

        return () => clearInterval(interval);
    });

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <div className="loading-modal-container">
                <CircularProgress
                    sx={{
                        color: '#545090',
                        thickness: 4
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#545090',
                        fontWeight: 500,
                        fontSize: '18px',
                        marginTop: '2rem',
                    }}
                >
                    {loadingTexts[loadingTextIndex]}
                </Typography>
            </div>
        </Backdrop>
    );
};

export default LoadingModal;
