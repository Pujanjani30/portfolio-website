import Skill from '../models/skill.model.js';

const getSkills = async () => {
  return Skill.find().sort({ skill_sort_order: 1 });
}

const addSkill = async (data) => {
  const skill = await Skill.findOne({ skill_name: data.skill_name });
  if (skill)
    throw new Error('ALREADY_EXISTS');

  return Skill.create(data);
}

const reorderSkills = async (data) => {
  let bulkData = [];
  let skills = data?.skills || [];

  for (const skill of skills) {
    bulkData.push({
      updateOne: {
        filter: { _id: skill.id },
        update: { skill_sort_order: skill.skill_sort_order }
      }
    });
  }

  return await Skill.bulkWrite(bulkData);
}

const updateSkill = async (data) => {
  const { id } = data;
  return Skill.findByIdAndUpdate(id, data, { new: true });
}

const deleteSkill = async (data) => {
  const { id } = data;
  await Skill.findByIdAndDelete(id);

  return true;
}

export {
  getSkills,
  addSkill,
  reorderSkills,
  updateSkill,
  deleteSkill
};