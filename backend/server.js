// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize the app and port
const app = express();
const port = process.env.PORT || 5000;  // Use the port from environment or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (using an environment variable for the URI)
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cleaning-service';  // Default to local MongoDB if no MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB: ', error));

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  address: { type: String, required: true },
  date_time: { type: String, required: true },
  service_type: { type: String, required: true },
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

// API endpoint to get all bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// API endpoint to get a specific booking by ID
app.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// API endpoint to create a new booking
app.post('/bookings', async (req, res) => {
  const { customer_name, address, date_time, service_type } = req.body;

  // Validate incoming request data
  if (!customer_name || !address || !date_time || !service_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBooking = new Booking({ customer_name, address, date_time, service_type });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// API endpoint to update a booking by ID
app.put('/bookings/:id', async (req, res) => {
  const { customer_name, address, date_time, service_type } = req.body;

  // Validate incoming request data
  if (!customer_name || !address || !date_time || !service_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { customer_name, address, date_time, service_type },
      { new: true }  // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// API endpoint to delete a booking by ID
app.delete('/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
