
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    category: Array,
    location: {
      district: String,
      area: String
    },
    description: String,
    contact: {
      phone: String,    
    },
    views: {
      type: Number,
      default: 0
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    socialMedia: [{
      platform: String,
      url: String
    }],
    priceRange: String,
    rating: {
      average: {type: Number, default: 0},
      count: {type: Number, default: 0}
    },
    imageUrl: String
  },
  {
    timestamps: true,
    collection: "services",
  },
);


export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);

  