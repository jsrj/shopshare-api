'use strict';

const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({

});

const Qualification = mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;