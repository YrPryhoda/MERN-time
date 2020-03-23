const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { // associated with User model in DB
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: String,
  githubusername: String,
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: String,
      from: {
        type: String,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        required: false
      },
      description: String
    }],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        required: false
      },
      description: String
    }],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
