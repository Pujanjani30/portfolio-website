import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import createApi from './api/v1/index.js';
import './db/index.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/v1', createApi());

app.use('*', (req, res) => {
  res.status(404).send('404 Not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;