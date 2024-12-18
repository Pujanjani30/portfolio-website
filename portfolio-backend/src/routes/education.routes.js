import * as educationController from '../controllers/education.controller.js';

const eduactionRoutes = (app) => {
  app.get('/education', educationController.getAllEducations);
  app.post('/admin/education', educationController.addEducation);
  app.put('/admin/education/:id', educationController.updateEducation);
  app.delete('/admin/education/:id', educationController.deleteEducation);
};

export default eduactionRoutes;