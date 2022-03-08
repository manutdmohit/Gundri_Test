const mongoose = require('mongoose');

require('dotenv').config();

// Load Models
const Hotel = require('./models/Hotel');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// importing json files
const pt_hotels = require('./_data/pt_hotels.json');

// Push Data into DB
const importData = async () => {
  try {
    await Hotel.create(pt_hotels);
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
    await Hotel.deleteMany();

    console.log('Data Destroyed...');
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
}
