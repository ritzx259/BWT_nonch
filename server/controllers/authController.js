import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import mongoose from 'mongoose';

// In-memory user store for fallback when MongoDB is down
let mockUsers = [];

// Helper to check DB connection
const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (isDbConnected()) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } else {
      // Mock behavior
      const userExists = mockUsers.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists (Mock)' });
      }

      const newUser = {
        _id: `mock_id_${Date.now()}`,
        name,
        email,
        password, // In real app, hash this!
        role: 'user',
        financialData: {},
        matchPassword: function(enteredPassword) { return enteredPassword === this.password; }
      };
      mockUsers.push(newUser);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (isDbConnected()) {
      const user = await User.findOne({ email }).select('+password');

      if (user && (await user.matchPassword(password))) {
        user.lastLogin = Date.now();
        await user.save();

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    } else {
      // Mock behavior
      const user = mockUsers.find(u => u.email === email);
      if (user && user.password === password) {
         res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password (Mock)' });
      }
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const user = await User.findById(req.user._id);

      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          financialData: user.financialData,
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } else {
      // Mock behavior - req.user is set by authMiddleware from token
      // In mock mode, we just return the user data we have in memory matching the ID
      const user = mockUsers.find(u => u._id === req.user.id);
       if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          financialData: user.financialData || {},
        });
      } else {
        res.status(404).json({ message: 'User not found (Mock)' });
      }
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (financial data)
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.financialData) {
          user.financialData = {
            ...user.financialData.toObject(),
            ...req.body.financialData,
          };
        }

        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          financialData: updatedUser.financialData,
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } else {
      // Mock behavior
       const userIndex = mockUsers.findIndex(u => u._id === req.user.id);
       if (userIndex !== -1) {
         const user = mockUsers[userIndex];
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;
         if (req.body.financialData) {
            user.financialData = {
              ...(user.financialData || {}),
              ...req.body.financialData
            };
         }
         mockUsers[userIndex] = user;
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            financialData: user.financialData,
         });
       } else {
         res.status(404).json({ message: 'User not found (Mock)' });
       }
    }
  } catch (error) {
    next(error);
  }
};
