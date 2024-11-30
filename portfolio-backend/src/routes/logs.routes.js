import * as logsControllers from '../controllers/logs.controller.js';
import { verifyToken } from '../middlewares/index.js';

const logsRoutes = (app) => {
  app.get('/admin/logs', verifyToken, logsControllers.getLogs);
}

export default logsRoutes;