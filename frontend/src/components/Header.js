import React from 'react'; // Import React
import { AppBar, Toolbar, Typography } from '@mui/material'; // Import necessary Material UI components for the header

const Header = () => (
  // AppBar component for the top navigation bar, position is static and background color is set
  <AppBar position="static" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
    {/* Toolbar component for better alignment and spacing of content inside the AppBar */}
    <Toolbar>
      {/* Typography component for the main title inside the header */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mx: 'auto' }}>
        🧹 Cleaning Service Management System
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header; // Export the Header component to be used in other parts of the app
