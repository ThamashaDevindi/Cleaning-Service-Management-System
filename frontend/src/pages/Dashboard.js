import React, { useEffect, useState } from 'react'; // Import React and hooks
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from '@mui/material'; // Import MUI components for UI

const Dashboard = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [selectedBooking, setSelectedBooking] = useState(null); // State to hold selected booking for editing
  const [openDialog, setOpenDialog] = useState(false); // State to control Dialog visibility

  // Load all bookings from the backend API
  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/bookings');
      const data = await response.json();
      setBookings(data); // Set fetched bookings to state
    } catch (error) {
      console.error('Error fetching bookings:', error); // Log any errors
    }
  };

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings(); // Initial call to load bookings
  }, []);

  // Delete booking with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) { // Ask for confirmation
      try {
        await fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' }); // Send DELETE request
        fetchBookings(); // Refresh the list of bookings
      } catch (error) {
        console.error('Error deleting booking:', error); // Log errors if delete fails
      }
    }
  };

  // Handle opening the dialog for editing a booking
  const handleEdit = (booking) => {
    setSelectedBooking(booking); // Set selected booking to state for editing
    setOpenDialog(true); // Open the edit dialog
  };

  // Save updated booking to the backend API
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBooking), // Send updated booking data in request body
      });
      setOpenDialog(false); // Close the dialog after saving
      fetchBookings(); // Refresh bookings list
    } catch (error) {
      console.error('Error updating booking:', error); // Log errors if update fails
    }
  };

  return (
    <TableContainer component={Paper}>
      {/* Table to display all bookings */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.customer_name}</TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{booking.date_time}</TableCell>
              <TableCell>{booking.service_type}</TableCell>
              <TableCell>
                {/* Edit and Delete buttons */}
                <Button onClick={() => handleEdit(booking)} variant="outlined" color="primary" size="small" style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(booking._id)} variant="outlined" color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          {/* Form fields for editing selected booking */}
          <TextField
            margin="dense"
            label="Customer Name"
            fullWidth
            value={selectedBooking?.customer_name || ''} // Show customer name
            onChange={(e) => setSelectedBooking({ ...selectedBooking, customer_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={selectedBooking?.address || ''} // Show address
            onChange={(e) => setSelectedBooking({ ...selectedBooking, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date & Time"
            type="datetime-local"
            fullWidth
            value={selectedBooking?.date_time || ''} // Show date & time
            onChange={(e) => setSelectedBooking({ ...selectedBooking, date_time: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Service Type"
            fullWidth
            value={selectedBooking?.service_type || ''} // Show service type
            onChange={(e) => setSelectedBooking({ ...selectedBooking, service_type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Dashboard;
