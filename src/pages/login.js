import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/login.module.css';
import Navbar from '../components/navbar'; 
import backgroundStyles from "../styling/background.module.css"

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
  
        // Store the JWT token in localStorage
        localStorage.setItem('token', token);
  
        // Redirect or perform other actions after successful login
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
    <div className={backgroundStyles.backgroundcolor}>
    <Navbar />
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <div className={styles.registerLink}>
        <p onClick={handleRegisterClick}>Register</p>
      </div>
    </div>
    </div>
  );
};

export default Login;
