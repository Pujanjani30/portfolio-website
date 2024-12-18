import Project from '../models/project.model.js';

const getProjects = async () => {
  const projects = await Project
    .find({ isVisible: true })
    .sort({ sort_order: 1 });

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

const reorderProjects = async (data) => {
  let bulkData = [];
  let projects = data?.projects || [];

  for (const project of projects) {
    bulkData.push({
      updateOne: {
        filter: { _id: project.id },
        update: { sort_order: project.sort_order }
      }
    });
  }

  return await Project.bulkWrite(bulkData);
}

const deleteProject = async (data) => {
  const { id } = data;
  await Project.findByIdAndDelete(id);

  return true;
}

export {
  getProjects,
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects
};