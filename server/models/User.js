import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const financialDataSchema = new mongoose.Schema({
  age: { type: Number },
  annualIncome: { type: Number },
  monthlyExpenses: {
    rent: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    others: { type: Number, default: 0 },
  },
  savingsRate: { type: Number },
  debts: {
    loans: { type: Number, default: 0 },
    creditCards: { type: Number, default: 0 },
  },
  investmentPortfolio: {
    stocks: { type: Number, default: 0 },
    bonds: { type: Number, default: 0 },
    realEstate: { type: Number, default: 0 },
    crypto: { type: Number, default: 0 },
  },
  riskTolerance: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  financialGoals: [{ type: String }],
  pan: { type: String, select: false }, // Masked or encrypted
  aadhaar: { type: String, select: false }, // Masked or encrypted
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  financialData: { type: financialDataSchema, default: {} },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
