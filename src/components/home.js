import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Pokemon from './pokemon';
import styles from '../styling/background.module.css'
const Home = () => {
  const [startRange, setStartRange] = useState(0);
  const pokemonPerPage = 3; // Number of Pokemon to display per page
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch Pokemon data
  const fetchPokemonData = async () => {
    try {
      // Generate 9 unique random numbers between 1 and 999
      const randomNumbers = [];
      while (randomNumbers.length < 9) {
        const randomNum = Math.floor(Math.random() * 999) + 1;
        if (!randomNumbers.includes(randomNum)) {
          randomNumbers.push(randomNum);
        }
      }

      // Fetch data for each random number
      const promises = randomNumbers.map((num) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${num}`).then((response) => response.json())
      );
      const pokemonData = await Promise.all(promises);
      setPokemonData(pokemonData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []); // Fetch data only once when the component mounts

  // Function to handle moving to the next page
  const nextPage = () => {
    if (startRange + pokemonPerPage < 9) {
      setStartRange(startRange + pokemonPerPage);
    }
  };

  // Function to handle moving to the previous page
  const prevPage = () => {
    if (startRange - pokemonPerPage >= 0) {
      setStartRange(startRange - pokemonPerPage);
    }
  };

  return (
    <div className={styles.backgroundcolor}>
      <Navbar />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
        <button onClick={prevPage}>&lt;</button> {/* Button for previous page */}
        {/* Render Pokemon within the current range */}
        {pokemonData.slice(startRange, startRange + pokemonPerPage).map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            name={pokemon.name}
            number={pokemon.id}
            types={pokemon.types.map((typeEntry) => typeEntry.type.name)}
            imageUrl={pokemon.sprites.front_default}
          />
        ))}
        <button onClick={nextPage}>&gt;</button> {/* Button for next page */}
      </div>
    </div>
  );
};

export default Home;
