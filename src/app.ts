import { HandleUi } from './handleUI';
import { Pokemon } from './Pokemon';
import { Logic } from './Logic';

const logic = new Logic();
const handleUi = new HandleUi();

async function retrieveAllPokemonsToDB() {
  let pokemonArr: Pokemon[] = [];
  // If the local storage has no pokemon array, fetch it from the API.
  if (localStorage.getItem('pokemonsData') === null) {
    console.log('Retrieving data from API...');
    // Get list of all pokemons names and urls.
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${logic.totalNUmberOfPokemons()}`
    );
    const pokemonJSON = await res.json();
    for (let i = 0; i < pokemonJSON.results.length; i++) {
      const pokemonRawData = await fetchPokemonDataByName(pokemonJSON.results[i].name);
      const newPokemon = new Pokemon(pokemonJSON.results[i].name, pokemonRawData);
      pokemonArr.push(newPokemon);
    }
    localStorage.setItem('pokemonsData', JSON.stringify(pokemonArr));
    console.log('Finished retrieving all the data from the API.');
    // Otherwise, get the pokemon array from the local storage.
  } else {
    console.log('Retrieved data from local storage.');
    pokemonArr = JSON.parse(localStorage.getItem('pokemonsData') as string);
  }
  handleUi.createAndDisplayPokemons();
  handleUi.searchPok();
  console.log(logic.getPokemonById(1));
}

async function fetchPokemonDataByName(pokemonName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await res.json();
}
retrieveAllPokemonsToDB();
