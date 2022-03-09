const mongoose = require('mongoose');
const slugify = require('slugify');

const staySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name of the hotel'],
    },
    slug: {
      type: String,
    },
    desc: {
      type: String,
      required: [true, 'Please provide hotel description'],
      maxlength: 10000,
    },
    stars: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: '{VALUE} is not supported ',
      },
      default: 1,
    },
    is_featured: {
      type: String,
      enum: {
        values: ['Yes', 'No'],
        message: '{VALUE} is not supported',
      },
      default: 'Yes',
    },
    featured_from: {
      type: Date,
    },
    featured_to: {
      type: Date,
    },
    type: {
      type: String,
      enum: {
        values: [
          'Home Stay',
          'Apartment',
          'Guest House',
          'Hotel',
          'Motel',
          'Residence',
          'Resort',
          'Time Share',
          'Extended Stay',
          'Villa',
          'Boutique Hotel',
        ],
        message: '{VALUE} is not supported',
      },
      default: 'Home Stay',
    },

    map_city: {
      type: String,
    },
    latitude: {
      type: String,
      default: null,
    },
    longitude: {
      type: String,
      default: null,
    },
    meta_title: {
      type: String,
    },
    meta_keywords: {
      type: String,
    },
    meta_desc: {
      type: String,
    },
    amenities: {
      type: [String],
    },
    payment_opt: {
      type: String,
      enum: ['Pay on Arrival', 'Pay on Later'],
      default: '',
    },
    adults: {
      type: Number,
      default: null,
    },
    children: {
      type: Number,
      default: null,
    },
    check_in: {
      type: String,
      default: '12:00 AM',
    },
    check_out: {
      type: String,
      default: '12:00 PM',
    },
    policy: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['Enabled', 'Disabled'],
        message: '{VALUE} is not supported ',
      },
      default: 'Enabled',
    },

    related: {
      type: String,
      default: '',
    },
    deposit: {
      type: String,
      enum: {
        values: ['Percentage', 'Fixed'],
        message: '{VALUE} is not supported',
      },
      default: 'Percentage',
    },
    deposit_value: {
      type: Number,
      default: null,
    },
    vat_tax: {
      type: String,
      enum: {
        values: ['Fixed', 'Percentage'],
        message: '{VALUE} is not supported',
      },
      default: 'Fixed',
    },
    vat_value: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      minlength: 10,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create hotle slug from the name
staySchema.pre('save', function (next) {
  this.slug = slugify(this.name, '-', { lower: true });
  next();
});

module.exports = mongoose.model('Stay', staySchema);
