import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import stylesbackground from '../../styling/background.module.css';
import styles from '../../styling/pokeDetail.module.css';
import pokemonStyles from '../../styling/pokemonBD.module.css';
import withAuth from '../utils/withAuth';

const PokemonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonData, setPokemonData] = useState(null);
  const [habitatData, setHabitatData] = useState(null); 
  const [GrowthRate, setGrowthRateData] = useState(null); 
  const [error, setError] = useState(null);

  const backgroundColors = {
    normal: '#e2e2e2',
    fire: '#f2864b',
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

  useEffect(() => {
    // Fetch Pokemon
    const fetchPokemonData = async () => {
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonResponse.ok) {
          throw new Error('Pokemon not found');
        }
        const pokemonData = await pokemonResponse.json();
        setPokemonData(pokemonData);
  
        // Fetch Habitat and GrowthRate
        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok) {
          throw new Error('Species data not found');
        }
        const speciesData = await speciesResponse.json();
        setHabitatData(speciesData.habitat); 
        setGrowthRateData(speciesData.growth_rate); 

      } catch (error) {
        router.push('/404');
      }
    };
  
    if (id) {
      fetchPokemonData();
    }
  }, [id]);
  
  

  const playLatestCry = () => {
    if (pokemonData && pokemonData.cries && pokemonData.cries.latest) {
      const audio = new Audio();
      audio.src = pokemonData.cries.latest;
      audio.play();
    }
  };
  
  const playLegacyCry = () => {
    if (pokemonData && pokemonData.cries && pokemonData.cries.legacy) {
      const audio = new Audio();
      audio.src = pokemonData.cries.legacy;
      audio.play();
    }
  };
  

  return (
    <div className={stylesbackground.backgroundcolor}>
      <Navbar />
      <div className={styles.mainOuterContainer}>
      <div className={styles.container}>
        <div className={styles.DetailsContainer}>
        <p>
          {pokemonData ? (
            <>
              <span>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</span> is a {pokemonData.types.map((type) => type.type.name).join(' / ')} Pokémon. 
              It weighs {pokemonData.weight / 10} kg and has a height of {pokemonData.height / 10} meter/s.
              Its abilities include: {pokemonData.abilities.map((ability, index) => (
                <span key={index}>{ability.ability.name}{index !== pokemonData.abilities.length - 1 ? ', ' : ''}</span>
              ))}
              <br />
              <br />
              Stats:
              <ul className={styles.detailsList}>
                {pokemonData.stats.map((stat, index) => (
                  <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
              <br />
              Habitat: {habitatData ? habitatData.name : 'Unknown'}
              <br /><br />
              Forms: {pokemonData.forms.length > 0 ? pokemonData.forms.map((form) => form.name).join(', ') : 'No forms available'}
              <br />
              Growth Rate: {GrowthRate ? GrowthRate.name : 'Unknown'}
              <br /><br />
              Game Indices: {pokemonData.game_indices.length > 0 ? pokemonData.game_indices.map((index) => index.version.name).join(', ') : 'No game indices available'}
            </>
          ) : (
            'Loading...'
          )}
        </p>
        </div>
        <div className={styles.mainContainer}>
          {pokemonData && (
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.imageContainer}>
                    {pokemonData.id > 920 ? (
                      <img src={pokemonData.sprites.front_default} alt="Pokemon" className={`${styles.image} image`} />
                    ) : (
                      <img src={pokemonData.sprites.other.showdown.front_default} alt="Pokemon" className={`${styles.image} image`} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Name: {pokemonData.name}</td>
                </tr>
                <tr>
                  <td>Index: {pokemonData.id}</td>
                </tr>
                <tr>
                  <td className={styles.typeCell}>
                    <span>Type:</span>
                    <div className={pokemonStyles.typeContainers}> 
                      {pokemonData.types.map((type, index) => (
                        <div key={index} className={`${pokemonStyles.typeContainer}`} style={{ backgroundColor: backgroundColors[type.type.name.toLowerCase()] }}>
                          <p className={`${pokemonStyles.type}`}>{type.type.name}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Weight: {pokemonData.weight / 10} kilograms</td>
                </tr>
                <tr>
                  <td>Height: {pokemonData.height / 10} meters</td>
                </tr>
                <tr>
                  <td>
                    Abilities:
                    {pokemonData.abilities.map((ability, index) => (
                      <div key={index}>{ability.ability.name}</div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.buttonContainer}>
                      Cries:
                      <button className={styles.button} onClick={playLatestCry}>Latest</button>
                      {pokemonData.cries && pokemonData.cries.legacy && (
                        <button className={styles.button} onClick={playLegacyCry}>Legacy</button>
                      )}                  
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default withAuth(PokemonPage);
