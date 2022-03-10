require('dotenv').config();
require('express-async-errors');

// Packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./db/connect');

const app = express();

// Routes
const hotelRoutes = require('./routes/hotelRoutes');

const adminRoutes = require('./routes/adminRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const guestCustomerRoutes = require('./routes/guestCustomerRoutes');

// Stay Routes
const stayRoutes = require('./routes/StayRoutes/stayRoute');

// Room Routes
const roomRoutes = require('./routes/StayRoutes/roomRoute');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// // Enable CORS
// app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 8000;

// Body Parser
app.use(express.json());

// Parsing the signed cookie
app.use(cookieParser(process.env.JWT_SECRET));

// Mount the routers
app.use('/api/v1/hotels', hotelRoutes);

//Account Routes
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/guestcustomers', guestCustomerRoutes);

// Stay Routes
app.use('/api/v1/stays', stayRoutes);

// Room Routes
app.use('/api/v1/rooms', roomRoutes);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`The server is listening on port ${port}`));
};

start();
