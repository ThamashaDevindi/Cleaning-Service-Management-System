import React, { useState } from 'react'; 
import {
  TextField, Button, MenuItem, Typography, Box
} from '@mui/material'; // Importing MUI components for UI elements
import axios from 'axios'; // Importing Axios for making HTTP requests

const BookingForm = () => {
  // State hook to manage form data
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_type: '',
  });

  // Handle change in form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update formData based on input name
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to the backend API with form data
      await axios.post('http://localhost:5000/bookings', formData);
      alert('Booking submitted!'); // Success message after submission
      // Reset form fields after successful submission
      setFormData({
        customer_name: '',
        address: '',
        date_time: '',
        service_type: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error); // Log the error in case of failure
      alert('Booking failed'); // Failure message
    }
  };

  return (
    // Form container styled with max width and centered on the page
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      
      {/* Title of the booking form */}
      <Typography variant="h5" gutterBottom>Book a Cleaning Service</Typography>

      {/* Text field for customer name */}
      <TextField
        label="Customer Name"
        name="customer_name"
        fullWidth
        margin="normal"
        required
        value={formData.customer_name} 
        onChange={handleChange} // Updates customer_name in formData
      />
      
      {/* Text field for address */}
      <TextField
        label="Address"
        name="address"
        fullWidth
        margin="normal"
        required
        value={formData.address} 
        onChange={handleChange} // Updates address in formData
      />

      {/* Text field for selecting date and time */}
      <TextField
        type="datetime-local"
        label="Date & Time"
        name="date_time"
        fullWidth
        margin="normal"
        required
        value={formData.date_time} 
        onChange={handleChange} // Updates date_time in formData
        inputProps={{
          min: new Date().toISOString().slice(0, 16), // Minimum date-time should be current time
        }}
        InputLabelProps={{
          shrink: true, // Ensures label stays visible even when there's a value
        }}
      />

      {/* Dropdown to select service type */}
      <TextField
        select
        label="Service Type"
        name="service_type"
        fullWidth
        margin="normal"
        required
        value={formData.service_type} 
        onChange={handleChange} // Updates service_type in formData
      >
        {/* Menu items for available service types */}
        <MenuItem value="Deep Cleaning">Deep Cleaning</MenuItem>
        <MenuItem value="Carpet Cleaning">Carpet Cleaning</MenuItem>
        <MenuItem value="Window Cleaning">Window Cleaning</MenuItem>
      </TextField>

      {/* Submit button */}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
};

export default BookingForm;
