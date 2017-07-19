'use strict';

const mongoose = require('mongoose');

const listingRatingSchema = new mongoose.Schema({
score: {
  type: Number,
  default: 5,
  required: [true, 'In order to rate, you must provide a rating']
},
userName: {
  type: String,
  required: [true, 'You must be logged in to rate a listing']
},
comment: {
  type: String,
  required: [true, 'Please provide a reason for your rating']
}
});

const ListingRating = mongoose.model('ListingRating', listingRatingSchema);

module.exports = ListingRating;