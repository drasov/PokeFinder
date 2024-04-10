import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import stylesbackground from '../../styling/background.module.css';
import styles from '../../styling/pokeDetail.module.css'; 

const PokemonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id]);

  return (
    <div className={stylesbackground.backgroundcolor}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          {/* Render the image if available */}
          {pokemonData && (
            <div className={styles.detailsContainer}>
              <img src={pokemonData.sprites.front_default} alt="Pokemon" className={styles.image} />
              {/* Pokemon details */}
              <div className={styles.detailItem}>
                <h2>Name:</h2>
                <p>{pokemonData.name}</p>
              </div>
              <div className={styles.detailItem}>
                <h2>Index:</h2>
                <p>{pokemonData.id}</p>
              </div>
              <div className={styles.detailItem}>
                <h2>Type:</h2>
                <ul className={styles.detailsList}>
                  {pokemonData.types.map((type) => (
                    <li key={type.slot}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* Render error message if there's an error */}
          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
