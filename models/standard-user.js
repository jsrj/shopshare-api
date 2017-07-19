'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name']
  },
  userName: {
    type: String,
    required: [true, 'Please provide a username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an e-mail address']
  },
  encPW: {
    type: String
  },
  facebookID: {
    type: String,
    default: 'none'
  }
  googleID: {
    type: String,
    default: 'none'
  },
  profileImage: {
    type: String,
    default: 'none'
  }
  userAge: {
    type: Object,
    default: {
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
    }
  },
  phone: {
    type: String,
    default: '(555) 867-5309'
  },
  proofOfID: {
    type: Object,
    default: {
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
    }
  },
  userLocation: {
    type: Object,
    default: { //new location-data object }
    // Not required since the API automatically populates this when it can
  },
  summary: {
    type: String,
    default: 'Like long walks on the beach, getting my hands dirty, and building ash trays...'
  }
  qualifications: {
    type: Array<Object>,
    default: [{}]
  }
  paymentData: {
    type: Object, // Everything inside of this MUST be obfuscated/encrypted and pre-processed by bcrypt before passing on to payment system
    default: {}
  },
  userRatings: {
    type: Array<Object>,
    default: [{}]
  }
  ratingHistory: {
    type: Array,
    default: []
    // Not required since API automatically populates this with ID of every rated listing andOR duplicate of that rating as posted in the listing
  },
  message: {
    type: Array<Object>,
    default: [
      {
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
      }
    ]
  },
  history: {
    type: Array,
    default: []
    // Not required as this is automatically populated over time
  }
isProvider: {
  type: Boolean,
  default: false
},

providerData: {
  type: Object,
  default: {}
}
});

const User = mongoose.model('User', userSchema);

module.exports = User;