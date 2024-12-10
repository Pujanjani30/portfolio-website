import { successResponse, errorResponse } from '../utils/http-response.js';
import * as projectService from '../services/project.service.js';

const getAllProjects = async (req, res) => {
  try {
    const response = await projectService.getAllProjects();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const getProjects = async (req, res) => {
  try {
    const response = await projectService.getProjects();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const addProject = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const response = await projectService.addProject(data);

    successResponse({
      res,
      message: 'Project added successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const reorderProjects = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    await projectService.reorderProjects(data);

    successResponse({
      res,
      message: 'Success',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const updateProject = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const response = await projectService.updateProject(data);

    successResponse({
      res,
      message: 'Project updated successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    await projectService.deleteProject(data);

    successResponse({
      res,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export {
  getAllProjects,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects
};
