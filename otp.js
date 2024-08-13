// otp.js

// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const email = document.getElementById('registerEmail').value;
//     const phone = document.getElementById('registerPhone').value;
//     const otp = generateOTP();
//     sendOTP(email, phone, otp);
//     alert('OTP sent to your email and phone.');
//   });
  
  document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    const otp = generateOTP();
    sendOTP(email, null, otp);
    document.getElementById('verifyOtpForm').style.display = 'block';
    alert('OTP sent to your email.');
  });
  
  document.getElementById('verifyOtpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputOtp = document.getElementById('otp').value;
    if (verifyOTP(inputOtp)) {
      alert('OTP verified. You can now reset your password.');
      window.location.href="login.html";
      
    } else {
      alert('Invalid OTP. Please try again.');
    }
  });
  
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  function sendOTP(email, phone, otp) {
    // Simulate sending OTP via email and phone
    console.log(`Sending OTP ${otp} to email: ${email} and phone: ${phone}`);
  }
  
  function verifyOTP(inputOtp) {
    // Simulate OTP verification
     storedOtp = generateOTP(); // This should be stored securely on the server
    return inputOtp === storedOtp;
  }
  
  