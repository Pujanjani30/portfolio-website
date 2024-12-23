import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  location_type: {
    type: String,
    default: 'On-site',
    enums: ['On-site', 'Remote', 'Hybrid'],
    trim: true,
  },
  startMY: {
    type: String,
    required: true,
    trim: true,
  },
  endMY: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  skills: {
    type: [String],
    trim: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);