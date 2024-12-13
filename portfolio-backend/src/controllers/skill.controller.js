import * as skillService from '../services/skill.service.js';
import { successResponse, errorResponse } from '../utils/http-response.js';

const getSkills = async (req, res) => {
  try {
    const response = await skillService.getSkills();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const addSkill = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const response = await skillService.addSkill(data);

    successResponse({
      res,
      message: 'Skill added successfully',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const reorderSkills = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    await skillService.reorderSkills(data);

    successResponse({
      res,
      message: 'Success',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const updateSkill = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    await skillService.updateSkill(data);

    successResponse({
      res,
      message: 'Skill updated successfully',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const deleteSkill = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    await skillService.deleteSkill(data);

    successResponse({
      res,
      message: 'Skill deleted successfully',
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export { getSkills, addSkill, reorderSkills, updateSkill, deleteSkill };