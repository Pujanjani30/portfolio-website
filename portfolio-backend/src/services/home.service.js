import Home from '../models/home.model.js';

const getHomeDetails = async () => {
  const home = await Home.findOne();

  return home;
};

const updateHomeDetails = async (data) => {
  data.socials = JSON.parse(data.socials);

  const home = await Home.findOne({});
  if (!home) {
    return await Home.create(data);
  }
  const updatedHome = await Home.findOneAndUpdate({}, data, { new: true });

  return updatedHome;
};

export { getHomeDetails, updateHomeDetails };