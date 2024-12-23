import { login, logout } from './auth.js';
import { getHomeDetails, updateHomeDetails } from './home.js';
import { getLogs } from './logs.js';
import {
  getProjects, getAllProjects, addProject, updateProject, deleteProject,
  reorderProjects
} from './project.js';
import {
  getSkills, addSkill, updateSkill, deleteSkill, reorderSkills
} from './skill.js';
import {
  getEducations, addEducation, updateEducation, deleteEducation
} from './education.js';
import {
  getExperiences, addExperience, updateExperience, deleteExperience
} from './experience.js';

export {
  // auth
  login,
  logout,

  // home
  getHomeDetails,
  updateHomeDetails,

  // project
  getProjects,
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,

  // skill
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,

  // education
  getEducations,
  addEducation,
  updateEducation,
  deleteEducation,

  // experience
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,

  // logs
  getLogs,
};