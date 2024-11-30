import ERRORS from '../config/error.config.js';
import logger from './logger.js';

const successResponse = ({ res, data = undefined, message, token = undefined }) => {
  res.status(200).json({
    status: 200,
    message,
    data,
    token
  });
}

const errorResponse = (req, res, err) => {
  console.log(err);

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  let error = ERRORS[err.message];

  if (!error) error = ERRORS['DEFAULT_ERROR'];

  res.status(error.HTTP_CODE).json({
    status: error.HTTP_CODE || 500,
    message: error.DEFAULT_MESSAGE
  });
}

export { successResponse, errorResponse };