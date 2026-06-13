import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    ip:         { type: String, required: true, unique: true },
    sessionId:  { type: String, required: true, unique: true },
    timeSpent:  { type: Number, default: 0 },  // seconds
    qualifies:  { type: Boolean, default: false }, // true if 15+ seconds
    updatedAt:  { type: Date, default: Date.now }
  });
  
  export default mongoose.model('Visitor', visitorSchema);

  