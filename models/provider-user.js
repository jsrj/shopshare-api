'use strict';

const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  ownerLiscenses: {
    type: Array,
    default: []
  },
  payableAccountData: {
    type: Object,
    default: {} // Whatever ends up in here should also be encrypted and decrypted only at the 3rd party endpoint
  },
  providerRatings: {
    type: Array,
    default: [{}]
  },
  listings: {
    type: Array,
    default: [{}]
  }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;