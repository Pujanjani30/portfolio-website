import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  skill_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  skill_icon: {
    type: String,
    trim: true
  },
  skill_type: {
    type: String,
    required: true,
    default: 'Technical',
    enum: ['Technical', 'Soft']
  },
  skill_level: {
    type: String,
    default: 'Beginner',
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  skill_associated_with: {
    type: String,
    trim: true
  },
  skill_sort_order: {
    type: Number
  }
}, { timestamps: true });

skillSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const maxSortOrder = await this.constructor.findOne({}).sort({ skill_sort_order: -1 });
      this.skill_sort_order = maxSortOrder ? maxSortOrder.skill_sort_order + 1 : 1;
    }
  } catch (err) {
    return next(err);
  }
  next();
});

export default mongoose.model('Skill', skillSchema);