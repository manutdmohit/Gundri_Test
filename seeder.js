const mongoose = require('mongoose');

require('dotenv').config();

// Load Models
const User = require('./models/User');
const Stay = require('./models/Stay');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Invoice = require('./models/Invoice');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// importing json files
const pt_hotels = require('./_data/pt_hotels.json');

// Push Data into DB
const importData = async () => {
  try {
    // await Hotel.create(pt_hotels);
    console.log('Data Imported...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Delete Date from DB
const deleteData = async () => {
  try {
    // await Hotel.deleteMany();
    await User.deleteMany();
    await Stay.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    await Invoice.deleteMany();

    console.log('Data Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteUsers = async () => {
  try {
    await User.deleteMany();
    console.log('Users Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const deleteStays = async () => {
  try {
    await Stay.deleteMany();
    console.log('Stays Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const deleteRooms = async () => {
  try {
    await Room.deleteMany();
    console.log('Rooms Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const deleteBookings = async () => {
  try {
    await Booking.deleteMany();
    console.log('Bookings Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const deleteInvoices = async () => {
  try {
    await Invoice.deleteMany();
    console.log('Invoices Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-du') {
  deleteUsers();
} else if (process.argv[2] === '-ds') {
  deleteStays();
} else if (process.argv[2] === '-dr') {
  deleteRooms();
} else if (process.argv[2] === '-db') {
  deleteBookings();
} else if (process.argv[2] === '-di') {
  deleteInvoices();
}
