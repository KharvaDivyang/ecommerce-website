const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: 'admin@shopnest.com' }).lean();
    console.log('found:', !!user);
    if (user) {
      console.log('email:', user.email);
      console.log('role:', user.role);
      console.log('passwordHash:', user.password);
      const match = await bcrypt.compare('password123', user.password);
      console.log('match password123:', match);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('error:', err.message);
    process.exit(1);
  }
})();
