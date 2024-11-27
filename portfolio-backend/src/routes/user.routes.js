import * as userControllers from '../controllers/user.controller.js';

const userRoutes = (app) => {
  app.post('/user/register', userControllers.register);
  app.post('/user/login', userControllers.login);
}

export default userRoutes;