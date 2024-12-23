import * as experienceController from '../controllers/experience.controller.js';

const experienceRoutes = (app) => {
  app.get('/experience', experienceController.getAllExperiences);
  app.post('/admin/experience', experienceController.addExperience);
  app.put('/admin/experience/:id', experienceController.updateExperience);
  app.delete('/admin/experience/:id', experienceController.deleteExperience);
};

export default experienceRoutes;