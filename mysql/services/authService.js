import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

const AuthService = {
  register: async (userData, callback) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = { ...userData, password: hashedPassword };
      User.create(user, callback); 
    } catch (error) {
      callback(error);
    }
  },
  login: async (email, password, callback) => {
    User.findByEmail(email, async (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, false, 'Invalid email or password');

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return callback(null, false, 'Invalid email or password');

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      callback(null, { token, user });
    });
  }
};

export default AuthService;
