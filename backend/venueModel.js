const mongoose = require('mongoose');
const { Schema } = mongoose;

const venueSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  classDuration: { type: String },
  classInfo: { type: String },
  classMapURL: { type: String },
  className: { type: String },
  classTrialURL: { type: String },
  dance: { type: Boolean },
  fitness: { type: Boolean },
  other: { type: Boolean },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  city: { type: String },
  county: { type: String },
  state: { type: String },
}, { collection: 'venues' });

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
