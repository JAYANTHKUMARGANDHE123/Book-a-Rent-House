const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password,usertype } = req.body;
    const user = new User({ username, email, password,usertype });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    else{
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token, userId: user._id, username: user.username,email:user.email});
    }
    }
    catch (err) {
      res.status(400).json({ message: err.message });
    }
    
});

// const express = require('express');
const app = express();

// Middleware to check if the user is logged in
function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { // Assuming you use a method like req.isAuthenticated()
        return next();
    } else {
        res.redirect('/login');
    }
}

// // Middleware to redirect based on user role
// function redirectBasedOnRole(req, res) {
//     const userRole = req.user.role; // Assuming req.user contains the logged-in user's information
    
//     switch(userRole) {
//         case 'admin':
//             res.redirect('/admin/dashboard');
//             break;
//         case 'user':
//             res.redirect('/user/dashboard');
//             break;
//         case 'guest':
//             res.redirect('/guest/dashboard');
//             break;
//         default:
//             res.redirect('/login');
//             break;
//     }
// }

// // Route that uses the middleware
// app.get('/dashboard', checkLoggedIn, redirectBasedOnRole);

// // Sample route for login (for demonstration purposes)
// app.get('/login', (req, res) => {
//     res.send('Login Page');
// });

// // Sample dashboard routes
// app.get('/admin-dashboard', (req, res) => {
//     res.send('Admin Dashboard');
// });

// app.get('/user/dashboard', (req, res) => {
//     res.send('User Dashboard');
// });

// app.get('/guest/dashboard', (req, res) => {
//     res.send('Guest Dashboard');
// });


module.exports = router;
