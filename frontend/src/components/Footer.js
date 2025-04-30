import React from 'react'; // Import React
import { Box, Typography } from '@mui/material'; // Import Material UI components for layout and typography

const Footer = () => (
  // Box component to hold the footer content, with margin-top, padding, and background color
  <Box mt={5} textAlign="center" py={2} bgcolor="#A0A0A0">
    {/* Typography component for displaying the copyright text */}
    <Typography variant="body2" color="textSecondary">
      {/* Dynamically display the current year */}
      © {new Date().getFullYear()} Cleaning Services. All rights reserved.
    </Typography>
  </Box>
);

export default Footer; // Export Footer component
