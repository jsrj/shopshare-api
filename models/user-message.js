'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
        author: {
          type: String,
          default: 'ShopShare Admin'
          // Not required as this is automatically populated
        },
        timestamp: {
          type: String,
          default: '19/07/2017',
          // Not required as this is automatically populated
        },
        userType: {
          type: String,
          default: 'Admin'
        },
        subject: {
          type: String,
          default: 'Welcome To ShopShare'
        },
        content: {
          type: String,
          default: 'Blah blah blah, welcome to shopshare and stuff, test test test 1 2 3',
          required: [true, 'You cannot send an empty message']
        },
        attachmentUrls: {
          type: Array<String>,
          default: []
        }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;