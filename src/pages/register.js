import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/register.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = (event) => {
    event.preventDefault();

    // Store username and password in localStorage
    localStorage.setItem('registeredUsername', username);
    localStorage.setItem('registeredPassword', password);

    // Display success message
    setSuccessMessage('Registration successful');

    // Redirect to login page after successful registration
    router.push('/login');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
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
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
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
  );
};

export default Register;
