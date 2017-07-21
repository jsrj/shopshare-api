'use strict';

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please give your listing a title']
  },
  type: {
    type: String,
    required: [true, 'Please specify listing type']
  },
  for: { // Links to listing sub-model with a call like 'listing.for.facility...'
    type: Object,
    required: [true, 'Please fill out the details on what type of listing your are making.']
  },
  location: {
    type: Object,
    required: [true, 'Please tell us where your listing will be located']
  },
  ratings: {
    type: Array,
    default: [{}]
  },
  provider: { // Not a required, since this will always be populated by API whe a listing is generated
    type: String,
    default: 'Banksy'
  },
  hasPrerequisites: {
    type: Boolean,
    default: false,
    required: [true, 'Please state if this users will have to meet certain requirements before renting this listing']
  },
  pricePolicy: {
    type: Object, // listing.pricePolicy.deposit
    default: {
      price: {
        type: Number,
        default: 5.00,
        required: [true, 'please provide price']
      },
      perRate: {
        type: String,
        default: 'Day',
        required: [true, 'Please specify if this price is per Hour, or Day']
      },
      deposit: {
        type: Boolean,
        default: false,
        required: [true, 'Please state if this listing will require an up-front deposit']
      },
      depositAmount: {
        type: Number,
        default: 0.00
      },
      cancellationWindow: {
        type: Number,
        default: 24,
        required: [true, 'Please specify window of time (in hours) that user may cancel without penalty']
      }
    }
  },
  reservedDates: {
    type: Array,
    default: [] // In other words, this is completely open availability
  },
  photoUrls: {
    type: Array,
    default: [],
    required: [false, 'It is recommended you provide at least one photo to represent this listing']
  },
  additionalInfo: {
    type: String,
    default: ''
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;