// models
import User from '../models/user.model.js'

const register = async (data) => {
  const isExists = await User.findOne({ user_email: data.email });
  if (isExists)
    throw new Error('ALREADY_EXISTS');

  const user = await User.create({
    user_fullname: data.fullname,
    user_email: data.email,
    user_password: data.password
  })

  if (!user)
    throw new Error('SOMETHING_WENT_WRONG');

  const token = await user.generateAccessToken()

  user.user_password = undefined;

  return { user, token }
};

const login = async (data) => {
  const user = await User.findOne({ user_email: data.email });
  if (!user)
    throw new Error('INVALID_CREDENTIALS');

  const isVerified = await user.verifyPassword(data.password);
  if (!isVerified)
    throw new Error('INVALID_CREDENTIALS');

  const token = await user.generateAccessToken()

  user.user_password = undefined;

  return { user, token }

};

export { register, login };