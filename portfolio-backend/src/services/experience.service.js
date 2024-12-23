import Experience from "../models/experience.model.js";

const getAllExperiences = async () => {
  return await Experience.find()
    .sort({ startMY: -1 });
};

const addExperience = async (data) => {
  return await Experience.create(data);
};

const updateExperience = async (data) => {
  const { id } = data;
  return await Experience.findByIdAndUpdate(id, data, { new: true });
};

const deleteExperience = async (data) => {
  const { id } = data;
  await Experience.findByIdAndDelete(id);
  return true;
};

export {
  getAllExperiences,
  addExperience,
  updateExperience,
  deleteExperience
};