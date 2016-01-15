import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema);
