import { successResponse, errorResponse } from '../utils/http-response.js';
import * as logsService from '../services/logs.serivce.js';

const getLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const response = await logsService.getLogs(page, limit);

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export { getLogs };