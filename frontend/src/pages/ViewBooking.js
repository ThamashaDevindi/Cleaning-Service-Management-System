import React, { useEffect, useState } from 'react'; // Import React and hooks
import { Container, Typography } from '@mui/material'; // Import MUI components for UI
import axios from 'axios'; // Import axios for HTTP requests
import { useParams } from 'react-router-dom';  // To get the booking ID from the URL

function ViewBooking() {
  const { id } = useParams();  // Get the ID from the URL params (booking ID)
  const [booking, setBooking] = useState(null); // State to hold the booking data

  useEffect(() => {
    // Fetch the booking by ID from the backend API when the component mounts or ID changes
    axios.get(`http://localhost:5000/bookings/${id}`)
      .then((response) => {
        setBooking(response.data); // Set the booking data from the response
      })
      .catch((error) => {
        console.error('Error fetching booking:', error); // Log any errors during the request
      });
  }, [id]); // The effect runs every time the booking ID changes

  if (!booking) {
    return <Typography>Loading...</Typography>; // Show loading text while the booking data is being fetched
  }

  return (
    <Container>
      {/* Display the booking details */}
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="h6">Customer Name: {booking.customer_name}</Typography>  {/* Display customer name */}
      <Typography>Address: {booking.address}</Typography>  {/* Display address */}
      <Typography>Date and Time: {booking.date_time}</Typography>  {/* Display date and time */}
      <Typography>Service Type: {booking.service_type}</Typography>  {/* Display service type */}
    </Container>
  );
}

export default ViewBooking;
