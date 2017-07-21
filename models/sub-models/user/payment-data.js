'use strict';

const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({

});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;