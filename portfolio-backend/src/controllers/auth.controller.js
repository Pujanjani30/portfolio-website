// uitls
import { successResponse, errorResponse } from '../utils/http-response.js'

// service
import * as authSerivce from '../services/auth.service.js';

const register = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const response = await authSerivce.register(data);

    successResponse({
      res,
      message: 'Registered successfully',
      token: response.token,
      data: response.user
    })
  } catch (error) {
    errorResponse(res, error);
  }
};

const login = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const response = await authSerivce.login(data);

    successResponse({
      res,
      message: 'Logged in successfully',
      token: response.token,
      data: response.user
    })
  } catch (error) {
    errorResponse(res, error);
  }
};

export { register, login };