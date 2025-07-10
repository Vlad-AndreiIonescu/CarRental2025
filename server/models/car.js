
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: { type: String},
  type: { type: String},
  year: { type: Number},
  mileage: { type: String},
  transmission: { type: String},
  fuelType: { type: String },
  engineType: { type: String }, 
  driveType: { type: String }, 

  // Specificații tehnice
  horsepower: { type: Number },
  torque: { type: Number },
  acceleration: { type: Number }, // 0-100 km/h în secunde
  topSpeed: { type: Number },
  rangeKm: { type: Number }, // autonomie (EV)
  co2Emission: { type: Number }, // g/km

  // Dotări
  features: { type: [String] },
  hasGPS: { type: Boolean, default: false },
  hasBluetooth: { type: Boolean, default: false },
  hasParkingSensors: { type: Boolean, default: false },
  hasSunroof: { type: Boolean, default: false },
  hasCamera360: { type: Boolean, default: false },
  hasHeatedSeats: { type: Boolean, default: false },
  hasKeylessEntry: { type: Boolean, default: false },
  hasCarPlay: { type: Boolean, default: false },

  // Confort
  seats: { type: Number },
  doors: { type: Number },
  colorExterior: { type: String },
  colorInterior: { type: String },

  // Locație și disponibilitate
  location: {
    lat: { type: Number},
    lng: { type: Number },
  },
  city: { type: String },
  region: { type: String },
  country: { type: String },
  pickupMode: { type: String }, // "pickup", "delivery", "both"
  availableFrom: { type: Date },
  availableUntil: { type: Date },

  // Preț și închiriere
  pricePerDay: { type: Number},
  discount: { type: Number, default: 0 },
  depositRequired: { type: Boolean, default: false },
  minRentalDays: { type: Number, default: 1 },

  // Siguranță
  safetyRating: { type: Number }, // 1 - 5
  insuranceIncluded: { type: Boolean, default: false },
  roadAssistanceIncluded: { type: Boolean, default: false },

  // Alte info
  image: { type: String },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
  reviews: [
  {
    rating: { type: Number },
    comment: { type: String},
    date: { type: Date, default: Date.now },
  }
],
});

const Car = mongoose.model('Car', carSchema, 'car');
export default Car;
