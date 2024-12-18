import Education from "../models/education.model.js";

const getAllEducations = async () => {
  return await Education.find()
    .sort({ startYear: -1 });
};

const addEducation = async (data) => {
  return await Education.create(data);
};

const updateEducation = async (data) => {
  const { id } = data;
  return await Education.findByIdAndUpdate(id, data, { new: true });
};

const deleteEducation = async (data) => {
  const { id } = data;
  await Education.findByIdAndDelete(id);

  return true;
};

export {
  getAllEducations,
  addEducation,
  updateEducation,
  deleteEducation
};