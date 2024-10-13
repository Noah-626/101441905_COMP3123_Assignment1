const mongoose = require('mongoose');

// Define Note Schema
const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true, 
      trim: true     
  },
  email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
      lowercase: true, 
      validate: {
          validator: function(v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
      }
  },
  password: {
      type: String,
      required: true,
  },
  created_at: {
      type: Date,
      default: Date.now 
  },
  updated_at: {
      type: Date,
      default: Date.now 
  }
});

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
