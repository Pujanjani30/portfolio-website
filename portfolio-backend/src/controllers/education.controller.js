import * as educationService from '../services/education.service.js';
import { successResponse, errorResponse } from '../utils/http-response.js';

const getAllEducations = async (req, res) => {
  try {
    const response = await educationService.getAllEducations();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const addEducation = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    const response = await educationService.addEducation(data);

    successResponse({
      res,
      message: 'Education added successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const updateEducation = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    const response = await educationService.updateEducation(data);

    successResponse({
      res,
      message: 'Education updated successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const deleteEducation = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);
    await educationService.deleteEducation(data);

    successResponse({
      res,
      message: 'Education deleted successfully',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export {
  getAllEducations,
  addEducation,
  updateEducation,
  deleteEducation
};