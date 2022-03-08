const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: Number,
      required: true,
    },
    hotel_title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    discount: {
      type: String,
      default: null,
    },
    hotel_slug: {
      type: String,
      required: true,
    },
    hotel_desc: {
      type: String,
      required: [true, 'Please provide hotel description'],
      maxlength: 10000,
    },
    hotel_surroundings: {
      type: String,
      default: null,
    },
    hotel_services: {
      type: String,
      default: null,
    },
    hotel_admin_review: {
      type: String,
      default: null,
    },
    hotel_stars: {
      type: Number,
      required: [true, 'Please provide number of stars'],
    },
    hotel_ratings: {
      type: Number,
      default: null,
    },
    hotel_is_featured: {
      type: String,
      required: [true, 'Please provide hotel is featured or not'],
    },
    hotel_featured_from: {
      type: Number,
      required: [true, 'Please provide hotel featured from'],
    },
    hotel_featured_to: {
      type: Number,
      required: [true, 'Please provide hotel featured to'],
    },
    hotel_owned_by: {
      type: Number,
      required: [true, 'Please provide hotel owned by'],
    },
    hotel_type: {
      type: Number,
      required: [true, 'Please provide hotel type'],
    },
    hotel_city: {
      type: Number,
      required: [true, 'Please provide city number'],
    },
    hotel_base_price: {
      type: Number,
      default: null,
    },
    hotel_basic_discount: {
      type: Number,
      default: null,
    },
    hotel_map_address: {
      type: String,
      default: null,
    },
    hotel_map_zip: {
      type: Number,
      default: null,
    },
    hotel_map_city: {
      type: String,
    },
    hotel_map_country: {
      type: String,
      default: null,
    },
    hotel_latitude: {
      type: String,
      default: null,
    },
    hotel_longitude: {
      type: String,
      default: null,
    },
    hotel_meta_title: {
      type: String,
    },
    hotel_meta_keywords: {
      type: String,
    },
    hotel_meta_desc: {
      type: String,
    },
    hotel_amenities: {
      type: String,
      default: null,
    },
    hotel_payment_opt: {
      type: String,
      default: null,
    },
    hotel_adults: {
      type: Number,
      default: null,
    },
    hotel_children: {
      type: Number,
      default: null,
    },
    hotel_check_in: {
      type: String,
      required: [true, 'Please provide hotel checkin time'],
    },
    hotel_check_out: {
      type: String,
      required: [true, 'Please provide hotel checkout time'],
    },
    hotel_policy: {
      type: String,
    },
    hotel_status: {
      type: String,
      required: [true, 'Please provide hotel status'],
    },
    hotel_order: {
      type: Number,
      required: [true, 'Please provide hotel order'],
    },
    hotel_related: {
      type: String,
      default: null,
    },
    hotel_comm_fixed: {
      type: Number,
      required: [true, 'Please provide hotel comm fixed'],
    },
    hotel_tax_percentage: {
      type: Number,
      required: [true, 'Please provide hotel tax percentage'],
    },
    hotel_email: {
      type: String,
    },
    hotel_phone: {
      type: String,
    },
    hotel_website: {
      type: String,
    },
    hotel_featured_forever: {
      type: String,
    },
    hotel_trusted: {
      type: Number,
      required: [true, 'Please provide hotel trusted'],
    },
    hotel_refundable: {
      type: Number,
      required: [true, 'Please provide hotel refundable'],
    },
    hotel_best_price: {
      type: Number,
      required: [true, 'Please provide hotel best price'],
    },
    hotel_arrrivalpay: {
      type: String,
    },
    tripadvisor_id: {
      type: Number,
      default: null,
    },
    thumbnail_image: {
      type: String,
      required: [true, 'Please provide thumbnail image'],
    },
    module: {
      type: String,
      required: [true, 'Please provide module'],
    },
    hotel_created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pt_Hotel', hotelSchema);
