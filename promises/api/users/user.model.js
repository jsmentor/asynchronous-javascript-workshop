var mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    birthDate: Date
  });

module.exports = mongoose.model('User', userSchema);
