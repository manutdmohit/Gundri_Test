require('dotenv').config();
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./db/connect');

const app = express();

// Routes
const hotel = require('./routes/hotel');
const notFoundMiddleware = require('./middleware/not-found');

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 8000;

//Body Parser
app.use(express.json());

// Mount the routers
app.use('/api/v1', hotel);

// Middlewares
app.use(notFoundMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`The server is listening to the port ${port}`));
};

start();
