import { createAndDisplayPokemons, searchPok } from './handleUI';
import { Pokemon } from './Pokemon';
const TOTAL_NUMBER_OF_POKEMONS = 1154;
let currentPage = 0;

async function retrieveAllPokemonsToDB() {
  let pokemonArr: Pokemon[] = [];
  // If the local storage has no pokemon array, fetch it from the API.
  if (localStorage.getItem('pokemonsData') === null) {
    console.log('Retrieving data from API...');
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_NUMBER_OF_POKEMONS}`);
    const pokemonJSON = await res.json();
    for (let i = 0; i < pokemonJSON.results.length; i++) {
      const newPokemon = new Pokemon(pokemonJSON.results[i].name);
      await newPokemon.fetchPokemonData();
      pokemonArr.push(newPokemon);
    }
    console.log('Finished retrieving all the data from the API.');
    // Otherwise, get the pokemon array from the local storage.
  } else {
    console.log('Retrieved data from local storage.');
    pokemonArr = JSON.parse(localStorage.getItem('pokemonsData') as string);
  }
  localStorage.setItem('pokemonsData', JSON.stringify(pokemonArr));
}
retrieveAllPokemonsToDB();
createAndDisplayPokemons();
// Search for pikachu in order to display some pokemon onto our screen.
searchPok();
