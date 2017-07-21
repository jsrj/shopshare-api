'use strict';

const mongoose = require('mongoose');

const ownerLiscenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title of Liscense or Certification']
  },
  issuedBy : {
    type: String,
    required: [true, 'Name of Issuing Authority']
  },
  issueDate: {
    type: String,
    required: [true, 'Date that Liscense or Certification was issued']
  },
  doesExpire: {
    type: Boolean,
    required: [true, 'Does this liscense or Certification expire?']
  },
  expirationDate: {
    type: String,
    default: 'N/A'
  },
  verificationNumber: {
    type: String,
    default: ''
  }
});

const OwnerLiscense = mongoose.model('OwnerLiscense', ownerLiscenseSchema);

module.exports = OwnerLiscense;