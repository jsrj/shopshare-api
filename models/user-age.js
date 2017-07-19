'use strict';

const mongoose = require('mongoose');

const userAgeSchema = new mongoose.Schema({
      day: {
        type: Number,
        default: 01,
        required: [true, 'Please provide the day you were born']
      },
      month: {
        type: Number,
        default: 01,
        required: [true, 'Please provide the month (number) you were born']
      },
      year: {
        type: Number,
        default: 2017,
        required: [true, 'Please provide the year you were born']
      }
});

const UserAge = mongoose.model('UserAge', userAgeSchema);

module.exports = UserAge;