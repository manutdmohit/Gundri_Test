require('dotenv').config();
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./db/connect');

const app = express();

// Routes
const hotel = require('./routes/hotel');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

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
app.use('/api/v1/hotels', hotel);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`The server is listening on port ${port}`));
};

start();
