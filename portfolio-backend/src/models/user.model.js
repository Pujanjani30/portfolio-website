import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcyptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  user_fullname: {
    type: String,
    required: true,
    trim: true
  },
  user_email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  user_password: {
    type: String,
    required: true,
    trim: true
  },
  user_role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("user_password")) return next();
  this.user_password = await bcyptjs.hash(this.user_password, 10);
  next();
})

userSchema.methods.verifyPassword = async function (password) {
  return await bcyptjs.compare(password, this.user_password);
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.user_fullname,
      email: this.user_email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },)
}

export default mongoose.model('User', userSchema);