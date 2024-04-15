import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/register.module.css';
import Navbar from '../components/navbar';
import backgroundStyles from "../styling/background.module.css"

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // Send registration data to backend
      const response = await fetch('/api/registerDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Display success message
      setSuccessMessage(data.message);

      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={backgroundStyles.backgroundcolor}>
      <Navbar />
      <div className={styles.registerContainer}>
        <h2>Register</h2>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleRegister} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        <div className={styles.registerLink}>
          <p onClick={handleLoginRedirect}>Already have an account? Login here.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
