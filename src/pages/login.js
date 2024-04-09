import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('./api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        // Handle successful login
        console.log('JWT token:', token);
        router.push('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    }
  };
  


  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className={styles.registerLink}>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
};

export default Login;