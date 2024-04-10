import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import Pokemon from '../components/pokemonBD';
import styles from "../styling/background.module.css"

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().replace(/\s+/g, '').toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Pokemon Data:', data); 
      setPokemonData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.backgroundcolor}>
      <Navbar />
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>A Wild {pokemonData && pokemonData.name} appeared!</h1>
      {error && <p>Error fetching data: {error}</p>}
      {pokemonData && (
        <div style={{ textAlign: 'center' }}>
          <Pokemon
            name={pokemonData.name}
            number={pokemonData.id}
            types={pokemonData.types.map(type => type.type.name)}
            imageUrl={pokemonData.id > 920 ? pokemonData.sprites.front_default : pokemonData.sprites.other.showdown.front_default}          />
        </div>
      )}
    </div>
  );
};


export default Search;
