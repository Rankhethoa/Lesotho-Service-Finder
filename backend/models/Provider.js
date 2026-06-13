import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const providerSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

// Hash password before saving
providerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Compare passwords on login
providerSchema.methods.comparePassword = function(plain) {
  return compare(plain, this.password);
};

export default model('Provider', providerSchema);

/*

const userSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Method to compare passwords on login
userSchema.methods.comparePassword = function(plain) {
  return compare(plain, this.password);
};

export default model('User', userSchema); */