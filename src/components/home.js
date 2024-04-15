import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Pokemon from './pokemonBD';
import styles from '../styling/background.module.css';
import homeStyles from '../styling/home.module.css';

const Home = () => {
  const [startRange, setStartRange] = useState(0);
  const pokemonPerPage = 3; // Number of Pokemon to display per page
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
        fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((response) => response.json())
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
      <div className={homeStyles.wildPokeContainer}>
        <h1 className={homeStyles.wildPokemon}>Wild Pokemon appeared!</h1>
      </div>
      {isLoading && <h1 style={{textAlign:'center'}}>Loading...</h1>}
      {error && <p>Error: {error.message}</p>}
      <div className={homeStyles.container}>
        <div className={homeStyles.buttonContainer}>
          <button className={homeStyles.button} onClick={prevPage}>&lt;</button> 
        </div>
        <div className={homeStyles.pokemonContainer}>
          {pokemonData.slice(startRange, startRange + pokemonPerPage).map((pokemon) => (
            <div key={pokemon.id} className={homeStyles.pokemonCard}>
              <Pokemon
                name={pokemon.name}
                number={pokemon.id}
                types={pokemon.types.map((typeEntry) => typeEntry.type.name)}
                imageUrl={pokemon.id > 920 ? pokemon.sprites.front_default : pokemon.sprites.other.showdown.front_default}
              />
            </div>
          ))}
        </div>
        <div className={homeStyles.buttonContainer}>
          <button className={homeStyles.button} onClick={nextPage}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
