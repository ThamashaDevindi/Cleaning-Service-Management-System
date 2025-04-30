import React from 'react';
import './App.css'; // Import global styles
import { Route, Routes, useNavigate } from 'react-router-dom'; // For navigation and routing
import Dashboard from './pages/Dashboard'; // Dashboard component (view bookings)
import BookingForm from './pages/BookingForm'; // Booking form component
import { Container, Button, Box } from '@mui/material'; // MUI components for layout and UI
import Header from './components/Header'; // Custom header component
import Footer from './components/Footer'; // Custom footer component

function App() {
  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Function to handle booking form submission
  const handleBookingSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      if (response.ok) {
        alert('✅ Booking successful!');
        navigate('/dashboard'); // Navigate to the dashboard after successful booking
      } else {
        alert('❌ Failed to book the service.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    // Main layout container with vertical stacking and full height
    <Box display="flex" flexDirection="column" minHeight="100vh">
      
      {/* Header section (spans full width) */}
      <Header />

      {/* Content area with buttons and page routing; limited to medium width */}
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        
        {/* Navigation buttons to switch between Dashboard and Booking Form */}
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <Button variant="contained" color="primary" href="/dashboard">
            View Bookings
          </Button>
          <Button variant="contained" color="secondary" href="/book">
            Book a Service
          </Button>
        </Box>

        {/* Define page routes here */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<BookingForm onSubmit={handleBookingSubmit} />} />
        </Routes>
      </Container>

      {/* Footer section */}
      <Footer />
    </Box>
  );
}

export default App;
