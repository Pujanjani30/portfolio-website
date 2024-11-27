import * as authControllers from '../controllers/auth.controller.js';

const authRoutes = (app) => {
  app.post('/auth/register', authControllers.register);
  app.post('/auth/login', authControllers.login);
}

export default authRoutes;