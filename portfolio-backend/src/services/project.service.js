import Project from '../models/project.model.js';

const getProjects = async () => {
  const projects = await Project
    .find({ isVisible: true })
    .sort({ end_date: -1, start_date: -1 });

  return projects;
}

const getAllProjects = async () => {
  const projects = await Project
    .find()
    .sort({ end_date: -1, start_date: -1 });

  return projects;
}

const addProject = async (data) => {
  const project = await Project.create(data);

  return project;
}

const updateProject = async (data) => {
  const { id } = data;
  const project = await Project.findByIdAndUpdate(id, data, { new: true });

  return project;
}

const deleteProject = async (data) => {
  const { id } = data;

  const project = await Project.findByIdAndDelete(id);

  return project;
}

export {
  getProjects,
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
};