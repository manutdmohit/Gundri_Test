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
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const stayRouter = require('./routes/stayRoutes');
const roomRouter = require('./routes/roomRoutes');

const hotelRoutes = require('./routes/hotelRoutes');

const adminRoutes = require('./routes/adminRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const guestCustomerRoutes = require('./routes/guestCustomerRoutes');

// User Routes
const userRoutes = require('./routes/UserRoutes/user');

// Stay Routes

// Room Routes

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

app.get('/', (req, res) => {
  res.send('Hello, Ecommerce');
});

app.get('/api/v1', (req, res) => {
  // accessing cookie

  // accessing signed cookie
  console.log(req.signedCookies);
  res.send('Hello, Gundri');
});

// Mount the routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stays', stayRouter);
app.use('/api/v1/rooms', roomRouter);

app.use('/api/v1/hotels', hotelRoutes);

// Account Routes
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/guestcustomers', guestCustomerRoutes);

// // User Routes
// app.use('/api/v1', userRoutes);

// // Stay Routes
// app.use('/api/v1/stays', stayRoutes);

// // Room Routes
// app.use('/api/v1/rooms', roomRoutes);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`The server is listening on port ${port}`));
};

start();
