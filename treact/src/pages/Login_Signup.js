import React, { useState } from 'react';
import './Login_Signup.css'; // External CSS file for styling

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleLogin = () => {
    if (validate()) {
      // Handle login logic here (authentication, validation, etc.)
      console.log('Logging in with:', username, password);
    }
  };

  const handleSignup = () => {
    if (validate()) {
      // Handle signup logic here (e.g., sending data to backend)
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
              <input 
                type="text" 
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phoneNumber ? 'error' : ''}
              />
              <div className="error-msg">{errors.phoneNumber}</div>
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
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          <div className="error-msg">{errors.password}</div>
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

export default App;
