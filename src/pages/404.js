import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styling/404.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="https://www.icegif.com/wp-content/uploads/2022/05/icegif-784.gif" alt="404 Image" className={styles.image} />
        <h1 className={styles.h1}>404</h1>
      </div>
      <h3 className={styles.h3}>Charizard used flamethrower and lit your path aflame!</h3>
      <p onClick={handleReturn} className={styles.run}>Run!</p>
    </div>
  );
};

export default NotFoundPage;
