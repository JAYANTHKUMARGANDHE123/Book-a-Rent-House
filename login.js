// script.js


  //  (function(){
  //     emailjs.init({
  //       publicKey: "Rls0rQQ0q10VY55iA",
  //     });
  //  })();
document.getElementById('loginForm').addEventListener('submit', function(event) {
  

    event.preventDefault();
    // const username = document.getElementById('loginUsername').value;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // Send login data to the server
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password,usertype })

      

    })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Login successful!');
    //   } else {
    //     alert('Login failed!');
    //   }
    // });
    
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json();
      })
      .then(data => {console.log('Success:', data.email);
        (function(){
          emailjs.init("Rls0rQQ0q10VY55iA");
      })();       
      // Collect the data
      const eemail = data.email;  
      
      const otp = Math.round(Math.random() * 1000000);
      
      // Convert the number to a string and pad it with leading zeros if necessary to ensure it's 6 digits
      const otpString = otp.toString().padStart(6, '0');
      
      const templateParams = {
          to_email: eemail, // It's generally not advisable to send passwords via email
          otp:otpString
      };
      
      // Send the email
      emailjs.send('service_1j633na', 'template_wxcspmg', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Email sent successfully!');
      })
      
      .catch(function(error) {
        console.log('FAILED...', error);
        alert('Failed to send');})
     
      
      
    //window.location.href='index.html';
      })
      .catch(error => console.error('Error:', error));
     
  })
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const usertype = document.getElementById('usertype').value;
    // Send registration data to the server
    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password,usertype })
    })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Registration successful!');
    // }
    //    else {
    //     alert('Registration failed!');
    //   }
    // })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {console.log('Success:', data);
        window.location.href='login.html';})
        .catch(error => console.error('Error:', error));

  });
  
// function sendOTP(){
//   const email=document.getElementById('loginEmail');
//   const verifyOTP =document.getElementById('otp-verify');

//   let otp_val = Math.floor(Math.random()*10000);

//   let emailbody = `<h2>Your OTP is </h2>${otp_val}`;

  
//   email.send({
//     SecureToken : "9d60ebd0-8af5-48c6-928e-ba3ab5ef0a7d",
//     To : email.value,
//     From : "jayanthkumargandhe@gmail.com",
//     Subject : "This is the subject",
//     Body :emailbody,
// }).then(
//   message => {
//     if (message==="OK"){
//       alert("OTP sent to your eamil" + email.value);

//       verifyOTP.style.display="flex";
//       const otp =document.getElementById('otp');
//       const otp_btn = document.getElementById('otp_btn');


//       otp_btn.addEventListener('click',()=>{
//         if (otp.value == otp_val){
//           alert("Email address verified")
//         }
//         else{
//           alert("Invalid OTP ");
//         }
//       })

//     }
//   }
// );

// }


function sendMail(){
  (function(){
    emailjs.init("Rls0rQQ0q10VY55iA");
})(); 
// Collect the data
const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;

// Prepare the template parameters

const otp = Math.round(Math.random() * 1000000);

// Convert the number to a string and pad it with leading zeros if necessary to ensure it's 6 digits
const otpString = otp.toString().padStart(6, '0');

const templateParams = {
    to_email: email,
    user_password: password, // It's generally not advisable to send passwords via email
    otp:otpString
};

// Send the email
emailjs.send('service_1j633na', 'template_wxcspmg', templateParams)
.then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    alert('Email sent successfully!');
})
.catch(function(error) {
  console.log('FAILED...', error);
  alert('Failed to send email.');})
}
