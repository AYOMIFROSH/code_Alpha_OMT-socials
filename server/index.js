const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const User = require('./models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, '705843Temi5101Tayo', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  };

  app.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { firstName, lastName, userName, email, phoneNumber } = user;
      res.status(200).json({ firstName, lastName, userName, email, phoneNumber });
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  });
  
  
  
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
      // ...
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, '705843Temi5101Tayo', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  });
  

function generateSixDigitCode() {
    // Implement your code to generate the code here
    return Math.floor(Math.random() * 900000) + 100000;
}

app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const verificationCode = generateSixDigitCode(); // Generate the code

        const user = await User.findOne({ email });
        if (!email) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(email, user.email);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        // Store the code in your database alongside the user's email
        // Send an email with the code (use nodemailer)

        res.status(200).json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending verification code: ' + error.message });
    }
});

// Add this route for handling password reset
app.post('/reset-password', async (req, res) => {
    try {
        const { email, verificationCode, newPassword } = req.body;

        // Verify the code against the stored value in your database
        // If valid, hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in your database (implement this part)

        res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password: ' + error.message });
    }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
