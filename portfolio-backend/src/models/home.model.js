import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  }
}, { _id: false });

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String,
    trim: true
  },
  resume: {
    type: String,
    required: true,
    trim: true
  },
  socials: {
    type: [socialLinkSchema],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('Home', homeSchema);