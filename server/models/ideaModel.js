const mongoose = require('mongoose');

const ideaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    contentType: {
      type: String,
      required: [true, 'Please specify content type'],
      enum: ['Blog Post', 'Social Media', 'Video', 'Email Newsletter', 'Podcast', 'Other'],
    },
    topics: [String],
    keywords: [String],
    scheduledDate: Date,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Draft', 'In Progress', 'Published', 'Archived'],
      default: 'Draft',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Idea', ideaSchema);
