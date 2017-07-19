'use strict';

const mongoose = require('mongoose');

const listingTypeSchema = new mongoose.Schema({
    type: {
    type    : String, // Either Facility, Equipment, or Service
    required: [true, 'Please select listing type']
  }

  facility  : {
    type: Object,
    default: {
      facilityType: 'Workshop',
      traits:     [
                  'Air-Conditioning',
                  'On-Site Air Compressor',
                  'Ventilation System',
                  'Internet',
                  'Variac'
                  ],
      description: 'Basically a garage full of tools and gadgets.',
      multiUser: false,
      equipment:  [
                  'Several different Air Drills with various RPM ratings',
                  'Air-Hammer',
                  'Drill Press',
                  'Rivet Squeeze',
                  'Bridgeport Lathe'
                  ],
      ppeProvided: true,
      ppeList:    [
                    'respirator',
                    'hearing protection',
                    'dust mask'
                  ],
  safetyFeatures: [
                  'Fire Extinguisher',
                  'Chicken Stick',
                  'Dedicated Power Supply'
                  ],
  additionalNotes: 'Tools are mainly for metal machining, but wood works too.'
    }
  },

  equipment : {
    type: Object,
    default: {
      powerType: {
      type: String,
      default: 'Hand-Powered',
      required: [true, 'Please specify what this tool is operated with.']
      },
      isRestricted: {
        type: Boolean,
        default: false,
        required: [true, 'Please specify if this tool has special liscense requirements for usage']
      },
      requiredLiscense: {
        type: String,
        default: 'NONE'
      },
      isPortable: {
        type: Boolean,
        default: false,
        required: [true, 'Please specify if you allow users to take this tool off-property when renting (or if it is even possible)']
      },
      isHazardous: {
        type: Boolean,
        default: false,
        required: [true, 'Does this equipment require that user sign a disclaimer or affadavit before usage?']
      }
      extras: {
        type: Array[String],
        default:[
                  'comes with 2 gallons of elbow grease.',
                  'May make you feel like Thor',
                  'Shows those nails who\'s boss'
                ]
        }
    }
  },

  service   : {
    type: Object,
    default: {
      physicalOnly: {
      type: Boolean,
      default: false,
      required: [true, 'Please specify if this service can be provided through platform, or strictly in-person.']
      },
      skillsOffered: {
        type: Array,
        default:[
                'Aircraft Assembly Mechanics',
                'First-hand 3D Printing experience',
                'Industry-Standard best practices for tool usage'
                ]
      },
      description: {
        type: String,
        required: [true, 'Please state if this service is an educational training, build to order, etc.']
      }
    }
  }
});

const ListingType = mongoose.model('ListingType', listingTypeSchema);

module.exports = ListingType;