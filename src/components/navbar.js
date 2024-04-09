import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/navbar.module.css';

const Navbar = ({ loggedIn, username }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

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

  const handleLogin = () => {
    router.push('/login');
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFavourites = () => {
    router.push('/favourites');
  };

  const handleRecentlyViewed = () => {
    router.push('/recently-viewed');
  };

  const handleLogout = () => {
    // Perform logout actions here
    router.push('/');
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
          onKeyPress={handleKeyPress} // Add event listener for Enter key press
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
            <button onClick={handleDropdownToggle} className={styles.usernameButton}>
              {username}
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownContent}>
                <button onClick={handleFavourites}>Favourites</button>
                <button onClick={handleRecentlyViewed}>Recently Viewed</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLogin} className={styles.loginButton}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
