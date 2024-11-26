import * as userControllers from '../controllers/user.controller.js';
import userModel from '../models/user.model.js';

const userRoutes = (app) => {
  app.post('/user', userControllers.register);
}

export default userRoutes;