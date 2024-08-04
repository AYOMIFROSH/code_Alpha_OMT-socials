const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const User = require('./models/user');
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true
})) // Use cors middleware
app.use(express.static('parent'));

// app.use(cookieParser());



// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/OMT', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the OMT database');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

connectDB();

app.use(express.urlencoded({ extended: true })); // Add this line to parse form data

// Register route
app.post('/register', async (req, res) => {
  try {
      const { firstName, lastName, userName, email, phoneNumber, password } = req.body;
      const newUser = new User({ firstName, lastName, userName, email, phoneNumber, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(400).json({ message: 'Error registering user: ' + error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful' });
  } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
  }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
