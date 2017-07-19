'use strict';

const mongoose = require('mongoose');

const identificationSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    default: "",
    required: [true, 'Please upload a copy of your ID']
  },
  idType: {
    type: String,
    default: 'Driver\'s License',
    required: [true, 'Please provide ID type']
  },
  issuingState: {
    type: String,
    default: 'Florida',
    required: [true, 'Please provide issuer']
  },
  issueDate: {
    type: String,
    default: '01/01/2017',
    required: [true, 'Please provide issue date']
  },
  expirationDate: {
    type: String,
    default: '01/02/2017',
    required: [true, 'Please provide expiration date']
  },
  idNumber: {
    type: String,
    default: '',
    required: [true, 'Please provide ID number']
  }
});

const Identification = mongoose.model('Identification', identificationSchema);

module.exports = Identification;