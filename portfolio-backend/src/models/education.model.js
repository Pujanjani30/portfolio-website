import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true,
    trim: true
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);