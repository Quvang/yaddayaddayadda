const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['member', 'moderator', 'admin'],
    default: 'member',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 4,
    select: false, // Makes sure password is never shown in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE - Remember when updating user (Do not use findOneAndUpdate) use SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, ' Please provide a valid email'], // Checks if this field is an email string - https://www.npmjs.com/package/validator
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your firstname'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your lastname'],
  },
  avatar: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: Boolean,
    default: false,
  },
  following: [],
  created: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Pre-saved middleware (Document middleware)
// I mellem det moment hvor vi modtager data og det moment hvor data bliver sendt til vores database
// Det perfecte tidspunkt at manipulere data til encryption
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash password with bcrypt and cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Stopper passwordconfirm fra at blive sent til vores database
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Makes sure the token is always created after the password has been changed
  next();
});

// tjekker om en user er active
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// Instancemethod - available to all documents of a certain collection
// Login sammenligning af passwords
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Tjekker om en bruger forsøger at logge ind efter han/hun har skiftet kodeord efter JWT token er oprettet
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  // False Means NOT changed
  return false;
};

// Token som bliver sent til brugeren for at resette sit password
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;
