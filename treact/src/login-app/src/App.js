import React, { useState } from 'react';
import './App.css'; // External CSS file for styling

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = () => {
    // Handle login logic here (authentication, validation, etc.)
    console.log('Logging in with:', username, password);
  };

  const handleSignup = () => {
    // Handle signup logic here (e.g., sending data to backend)
    console.log('Signing up with:', email, username, password);
  };

  return (
    <div className="login-container">
      <div className={`login-box ${isNewUser ? 'slide-up' : ''}`}>
        <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
        <form>
          {isNewUser && (
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          )}
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
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
