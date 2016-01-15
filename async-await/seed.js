import mongoose from 'mongoose';
import './api/users/user.model';

const User = mongoose.model('User'),
  users = require('../data/users.json');

export default async function() {
  try {
    await User.find({}).remove();
    await User.create(users);
    console.log('Seed data has been successfully inserted!');
  } catch (err) {
    console.error('Error on inserting seed data:', err);
  }
};
