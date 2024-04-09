import React, { useState } from 'react';
import { useRouter } from 'next/router';

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

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
