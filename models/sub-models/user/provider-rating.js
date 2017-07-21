'use strict';

const mongoose = require('mongoose');

const providerRatingSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 5,
    required: [true, 'Please provide a value to your rating']
  },
  user: {
    type: String,
    default: 'Joe Schmoe',
    // Not required as this will automatically be populated by passport
  },
  title: {
    type: String,
    default: '',
    required: [true, ' Please Give your rating/review of this user a title']
  },
  review: {
    type: String,
    default: '',
    required: [true, 'Please tell us why you rated this user']
  },
  relevantListing: {
    type: String,
    default: '',
    required: [true, 'Which of this provider\'s listings is this rating relevant to?']
  }
});

const ProviderRating = mongoose.model('ProviderRating', providerRatingSchema);

module.exports = ProviderRating;