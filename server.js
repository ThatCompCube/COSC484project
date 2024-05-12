// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true }, // Ensure usernames are unique
    password: String,
    school: String,
    role: { type: String, default: 'user' }
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword, school } = req.body;
  if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
  }
  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstName, lastName, username, password: hashedPassword, school });
      await newUser.save();

      // Generate token as part of the registration process
      const token = jwt.sign(
          { userId: newUser._id, role: newUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      // Send the token along with the success message
      res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Error registering new user' });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.json({ message: 'Logged in successfully', token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in');
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).send('User not found');
      res.json({ firstName: user.firstName, lastName: user.lastName, username: user.username, school: user.school });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send('Internal Server Error');
  }
});

function isAdmin(req, res, next) {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied');
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token not valid
        req.user = user;
        next();
    });
}

app.get('/protected-route', authenticateToken, (req, res) => {
    res.send('This is protected');
});

app.get('/admin-dashboard', isAdmin, (req, res) => {
    res.send('Admin Dashboard');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
