// external packages
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// database connection
import './db/index.js';

// global error handler
import './utils/errorHandler.js';

// api routes setup
import createApi from './api/v1/index.js';

// environment vars
const PORT = process.env.PORT || 8000;

// express app instance
const app = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors({ origin: '*' }));

// parse JSON request body
app.use(express.json({ limit: '10mb' }));

// serve static files from the 'public' directory
app.use(express.static('public'));

// parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data to prevent MongoDB query injection
app.use(mongoSanitize());

// api routes
app.use('/api/v1', createApi());

// handle 404 errors
app.use('*', (req, res) => {
  res.status(404).send('404 Not found');
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;