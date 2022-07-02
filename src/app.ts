import { createAndDisplayPokemons, searchPok } from './handleUI';
import { Pokemon } from './Pokemon';
const TOTAL_NUMBER_OF_POKEMONS = 10;
let currentPage = 0;

async function retrieveAllPokemonsToDB() {
  let pokemonArr: Pokemon[] = [];
  // If the local storage has no pokemon array, fetch it from the API.
  if (localStorage.getItem('pokemonsData') === null) {
    console.log('Retrieving data from API...');
    // Get list of all pokemons names and urls.
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_NUMBER_OF_POKEMONS}`);
    const pokemonJSON = await res.json();
    for (let i = 0; i < pokemonJSON.results.length; i++) {
      const pokemonRawData = await fetchPokemonDataByName(pokemonJSON.results[i].name);
      const newPokemon = new Pokemon(pokemonJSON.results[i].name, pokemonRawData);
      pokemonArr.push(newPokemon);
    }
    console.log('Finished retrieving all the data from the API.');
    localStorage.setItem('pokemonsData', JSON.stringify(pokemonArr));
    // Otherwise, get the pokemon array from the local storage.
  } else {
    console.log('Retrieved data from local storage.');
    pokemonArr = JSON.parse(localStorage.getItem('pokemonsData') as string);
  }
}

async function fetchPokemonDataByName(pokemonName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await res.json();
}
retrieveAllPokemonsToDB();
createAndDisplayPokemons();
searchPok();
