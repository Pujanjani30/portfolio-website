import * as projectControllers from '../controllers/project.controller.js';
import { verifyToken } from '../middlewares/index.js';

const projectRoutes = (app) => {
  app.get('/project', projectControllers.getProjects); // only public project
  app.get('/admin/project', verifyToken, projectControllers.getAllProjects); // all project

  app.post('/admin/project', verifyToken, projectControllers.addProject);
  app.put('/admin/project/:id', verifyToken, projectControllers.updateProject);
  app.delete('/admin/project/:id', verifyToken, projectControllers.deleteProject);
}

export default projectRoutes;