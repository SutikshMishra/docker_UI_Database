import React, { useState } from 'react';
import './Login_Signup.css'; // External CSS file for styling
// Example using React and React Router
// import { useHistory } from 'react-router-dom';

import 'MainLandingPage';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [errors, setErrors] = useState({});

  /* Testing here */

  const [errorFromApi, setErrorFromApi] = useState('');
  const [signUpError, setSignUpError] = useState('');

  console.log("errorFfromApi", errorFromApi);
  console.log("signUpError: ", signUpError)

  

  const validate = () => {
    let tempErrors = {};
    if (isNewUser) {
      if (!email) tempErrors.email = "Email is required.";
      if (!phoneNumber) tempErrors.phoneNumber = "Phone number is required.";
      if (email && !/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email address is invalid.";
      if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    }
    if (!username) tempErrors.username = "Username is required.";
    if (!password) tempErrors.password = "Password is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleLogin = async() => {
    if (validate()) {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
      

        })
      });
      
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        // Redirect the user
        window.location.href = '/'; // or use useHistory from 'react-router-dom' to navigate
      } else {
        const  error  = await response.json();
        // console.error("error from login: ", JSON.stringify(error));
        setErrorFromApi(error?.error);
      }
      //console.log('Signing up with:', email, username, password, phoneNumber);
      // Handle login logic here (authentication, validation, etc.)
      console.log('Logging in with:', username, password);
    }
  };

  const handleSignup = async () => {
    if (validate()) {
      // Handle signup logic here (e.g., sending data to backend)
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          phoneNumber,
          password
        })
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        // Redirect the user
        window.location.href = '/Login_Signup'; // or use useHistory from 'react-router-dom' to navigate
      } else {
        const { error } = await response.json();
        console.error(error);
        setSignUpError(error);
      }
      console.log('Signing up with:', email, username, password, phoneNumber);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${isNewUser ? 'slide-up' : ''}`}>
        <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
        <form>
          {isNewUser && (
            <>
              <input 
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              <div className="error-msg">{errors.email}</div>
              {signUpError === "Username already exists" || signUpError === "Email already exists" && <div>Email already exists</div>}
              <input 
                type="text" 
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phoneNumber ? 'error' : ''}
              />
              <div className="error-msg">{errors.phoneNumber}</div>
              {signUpError === "Phone number already registered" && <div>Phone number already registered</div>}
            </>
          )}
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? 'error' : ''}
          />
          <div className="error-msg">{errors.username}</div>
          {errorFromApi === "User not found" && <div>Username incorrect</div>}
          {signUpError === "Username already exists" && <div>Username already exists</div>}
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          <div className="error-msg">{errors.password}</div>
          {errorFromApi === "Invalid Password" && <div> Invalid Password</div>}
          {isNewUser && (
            <>
              <input 
                type="password" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
              />
              <div className="error-msg">{errors.confirmPassword}</div>
            </>
          )}
          {isNewUser ? (
            <button type="button" onClick={handleSignup}>Sign Up</button>
          ) : (
            <button type="button" onClick={handleLogin}>Login</button>
          )}
        </form>
        <p onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
        </p>
      </div>
    </div>
  );
}



// const history = useHistory();

// const handleLogin = async () => {
//   const response = await fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   });

//   if (response.ok) {
//     const data = await response.json();
//     localStorage.setItem('token', data.token);
//     history.push('/MainLandingPage');  // Redirect to the main page
//   } else {
//     // Handle errors, e.g., show an error message
//   }
// };

export default App;
