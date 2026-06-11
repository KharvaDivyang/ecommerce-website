const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: 'admin@shopnest.com' });
    if (!user) {
      console.log('Admin user not found.');
      process.exit(1);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash('password123', salt);
    await user.save();
    console.log('Admin password reset to password123.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin password:', error.message);
    process.exit(1);
  }
};

resetPassword();
