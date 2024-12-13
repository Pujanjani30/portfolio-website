import * as skillController from '../controllers/skill.controller.js';
import { verifyToken } from '../middlewares/token.middleware.js';

const skillRoutes = (app) => {
  app.get('/skill', skillController.getSkills);

  app.post('/admin/skill', verifyToken, skillController.addSkill);
  app.post('/admin/skill/reorder', verifyToken, skillController.reorderSkills);

  app.put('/admin/skill/:id', verifyToken, skillController.updateSkill);

  app.delete('/admin/skill/:id', verifyToken, skillController.deleteSkill);

};

export default skillRoutes;
