import * as experienceService from '../services/experience.service.js';
import { successResponse, errorResponse } from '../utils/http-response.js';

const getAllExperiences = async (req, res) => {
  try {
    const response = await experienceService.getAllExperiences();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const addExperience = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    const response = await experienceService.addExperience(data);

    successResponse({
      res,
      message: 'Experience added successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const updateExperience = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    const response = await experienceService.updateExperience(data);

    successResponse({
      res,
      message: 'Experience updated successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const deleteExperience = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    await experienceService.deleteExperience(data);

    successResponse({
      res,
      message: 'Experience deleted successfully',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export {
  getAllExperiences,
  addExperience,
  updateExperience,
  deleteExperience
};