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
  },
  geospatialData: {
    type: Object,
    default: {
      lon: 23454352345,
      lat: 32452345325234523
    }
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;