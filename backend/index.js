const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
// const twilio = require('twilio');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/property', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
app.use('/api/properties', propertyRoutes);
app.use('/api/users',userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Mock data
// const cities = [
//   { id: 1, name: 'Hyderabad' },
//   { id: 2, name: 'Kamareddy' },
//   { id: 3, name: 'Chennai' }
// ];

// const locations = {
//   1: ['Kondapur', 'Hitech-city', 'Madhapur'],
//   2: ['Osmanpura', 'Ashoknagar', 'vidyanagar'],
//   3: ['Saidapet', 'Basin Bridge', 'Ayanavaram']
// };

// Endpoints
app.get('/cities', (req, res) => {
  res.json(cities);
});

app.get('/locations/:cityId', (req, res) => {
  const cityId = req.params.cityId;
  res.json(locations[cityId] || []);
});



// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password'
//   }
// });

// const client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// function sendOTP(email, phone, otp) {
//   // Send OTP via email
//   transporter.sendMail({
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}`
//   });

//   // Send OTP via SMS
//   client.messages.create({
//     body: `Your OTP code is ${otp}`,
//     from: '',
//     to: phone
//   });
// }

// function verifyOTP(inputOtp, storedOtp) {
//   return inputOtp === storedOtp;
// }

// server.js
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const crypto = require('crypto');

// app.use(bodyParser.json());

// let otpStorage = {}; // Store OTPs temporarily in memory (consider using a database for production)

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email service
//   auth: {
//     user: 'jayanthkumargandhe@gmail.com',
//     pass: 'Jayanth$123'
//   }
// });

// app.post('/api/users/request-otp', (req, res) => {
//   const { email } = req.body;
//   const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

//   otpStorage[email] = otp; // Store OTP against the email

//   const mailOptions = {
//     from: 'jayanthkumargandhe@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ error: 'Failed to send OTP' });
//     }
//     // res.status(200).json({ message: 'OTP sent successfully' });
//     console.log('message sent')
//   });
// });

// app.post('/api/users/verify-otp', (req, res) => {
//   const { email, otp } = req.body;
//   const storedOtp = otpStorage[email];

//   if (storedOtp && storedOtp === otp) {
//     delete otpStorage[email]; // Clear OTP after successful verification
//     res.status(200).json({ message: 'OTP verified successfully' });
//   } else {
//     res.status(400).json({ error: 'Invalid OTP' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


// app.post("/sendemail", function (req, res) {
// 	//  console.log(req.query.usermail)
// 	var transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			user: 'nnoon.solutions@gmail.com',
// 			pass: 'surya84105'
// 		}
// 	});

// 	var mailOptions = {
// 		from: 'nnoon.solutions@gmail.com',
// 		//to: req.query.usermail,
// 		to: req.body.to,
// 		subject: req.body.subject,
// 		text: req.body.text,
		
// 	};

// 	transporter.sendMail(mailOptions, function (error, data) {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log('Email sent: ' + data.response);

// 			res.send({response:'mail sent sucessfully'})
// 		}
// 	});
// })