import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/navbar.module.css';

const Navbar = ({ handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (i.e., JWT token exists in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setLoggedIn(false)
    router.push('/');
    //window.location.reload();
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        PokeFinder
      </div>
      {/* SEARCH */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      {/* LOGIN */}
      <div className={styles.actions}>
        {loggedIn ? (
          <div className={styles.dropdown}>
            <button onClick={handleLogoutClick} className={styles.loginLogoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => router.push('/login')} className={styles.loginLogoutButton}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
