import { successResponse, errorResponse } from '../utils/http-response.js';
import * as homeService from '../services/home.service.js';
import { uploadFile } from '../utils/cloudinary.js';

const getHomeDetails = async (req, res) => {
  try {
    const response = await homeService.getHomeDetails();

    successResponse({
      res,
      message: 'Success',
      data: response
    })
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateHomeDetails = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, req.params, req.query);

    const profilePicLocalPath = req.files?.profilePic?.[0]?.path;
    const resumeLocalPath = req.files?.resume?.[0]?.path;

    // Handle profilePic upload
    if (profilePicLocalPath) {
      const profilePic = await uploadFile(profilePicLocalPath);
      data.profilePic = profilePic.url;
    }

    // Handle resume upload
    if (resumeLocalPath) {
      const resume = await uploadFile(resumeLocalPath);
      data.resume = resume.url;
    }

    await homeService.updateHomeDetails(data);

    successResponse({
      res,
      message: 'Home details updated successfully'
    })
  } catch (error) {
    errorResponse(res, error);
  }
};

export { getHomeDetails, updateHomeDetails };
