import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  start_date: {
    type: Date,
    default: null
  },
  end_date: {
    type: Date,
    default: null
  },
  tech_stack: {
    type: [String],
    default: []
  },
  project_link: {
    type: String,
    trim: true
  },
  repo_link: {
    type: String,
    trim: true
  },
  associated_with: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: 'Completed',
    enum: ['Completed', 'In Progress', 'On Hold']
  },
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  }
}, { timestamps: true });

projectSchema.path('start_date').validate(function (value) {
  return value <= this.end_date;
}, 'Start date must be less than or equal to end date.');


export default mongoose.model('Project', projectSchema);