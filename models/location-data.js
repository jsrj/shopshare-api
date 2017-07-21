'use strict';

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  zip: {
    type: Number,
    required: [true, 'Please provide ZIP code']
  },
  city: {
    type: String,
    required: [true, 'Please provide City']
  },
  state: {
    type: String,
    required: [true, 'Please provide State']
  },
  country: {
    type: String,
    default: 'United States'
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;