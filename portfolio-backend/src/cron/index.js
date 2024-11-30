import cron from 'node-cron';
import { deleteOldLogs } from '../services/logs.serivce.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Old logs deletion started');
  await deleteOldLogs();
});