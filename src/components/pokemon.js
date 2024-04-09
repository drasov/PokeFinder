import React from 'react';
import styles from '../styling/pokemon.module.css';

const Pokemon = ({ name, number, types, imageUrl }) => {
  // Define background colors for each type
  const backgroundColors = {
    normal: '#e2e2e2',
    fire: '#f4e2ca',
    water: '#caf4f1',
    electric: '#f4f1ca',
    grass: '#c7e5c7',
    ice: '#b3e1e1',
    fighting: '#ebd69d',
    poison: '#c183c1',
    ground: '#f4dfad',
    flying: '#c6b7f5',
    psychic: '#faafb4',
    bug: '#c6d16e',
    rock: '#d1c0a5',
    ghost: '#a292bc',
    dragon: '#a27feb',
    dark: '#a29288',
    steel: '#d1d1e0',
    fairy: '#fdb9e9',
  };

  // Render type containers
  const typeContainers = types?.map((type, index) => {
    const backgroundColor = backgroundColors[type];
    return (
      <div key={index} className={styles.typeContainer} style={{ backgroundColor }}>
        <p className={styles.type}>{type}</p>
      </div>
    );
  });

  return (
    <div className={styles.pokemonDetails}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <hr className={styles.separator} />
      <div className={styles.info}>
        <p className={styles.bold}>Name: {name}</p>
        <p className={styles.bold}>Number: #{number}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.typeContainers}>
        {typeContainers}
      </div>
    </div>
  );
};

export default Pokemon;
