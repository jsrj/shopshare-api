'use strict';

const mongoose = require('mongoose');

const payableAccountSchema = new mongoose.Schema({

});

const PayableAccount = mongoose.model('PayableAccount', payableAccountSchema);

module.exports = PayableAccount;