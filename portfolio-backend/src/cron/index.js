import cron from 'node-cron';
import https from 'https';
import { deleteOldLogs } from '../services/logs.serivce.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Old logs deletion started');
  await deleteOldLogs();
});

cron.schedule("*/10 * * * *", () => {
  console.log("Pinging self to prevent inactivity...");

  const req = https.get(process.env.WEB_SERVICE_URL, (res) => {
    console.log(`Ping status: ${res.statusCode}`);
  });

  req.on('error', (err) => {
    console.error(`Ping error: ${err.message}`);
  });

  req.end();
});