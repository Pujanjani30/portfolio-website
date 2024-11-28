import * as homeControllers from '../controllers/home.controller.js';
import { verifyToken, upload } from '../middlewares/index.js';

const homeRoutes = (app) => {
  app.get('/home', homeControllers.getHomeDetails);

  app.post('/admin/home', verifyToken, upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]), homeControllers.updateHomeDetails);
}

export default homeRoutes;
