import { HandleUi, addPokemonToPreviewBox, handleInputEntered } from './utils/HandleUi';
import { Pokemon } from './components/Pokemon';
import { Logic } from './utils/Logic';

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
    // TODO: Make fetching each pokemon async.
    for (const pokemonJsonObj of pokemonJSON.results) {
      const pokemonRawData = await fetchPokemonDataByName(pokemonJsonObj.name);
      const newPokemon = new Pokemon(pokemonJsonObj.name, pokemonRawData);
      pokemonArr.push(newPokemon);
    }
    localStorage.setItem('pokemonsData', JSON.stringify(pokemonArr));
    console.log('Finished retrieving all the data from the API.');
    // Otherwise, get the pokemon array from the local storage.
  } else {
    pokemonArr = JSON.parse(localStorage.getItem('pokemonsData') as string);
    console.log('Retrieved data from local storage.');
  }
  handleUi.createAndDisplayPokemons();
  addPokemonToPreviewBox(logic.getRandomPokemon());
}

function addEventListenersForSearch() {
  const submitIcon = document.querySelector('.search-icon') as HTMLpokemonJsonObj;
  submitIcon.addEventListener('click', handleInputEntered);

  const inputEl = document.querySelector('.search-input') as HTMLInputpokemonJsonObj;
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInputEntered();
  });

  const getRandomPokemonBtn = document.querySelector('.get-random') as HTMLButtonpokemonJsonObj;
  getRandomPokemonBtn.addEventListener('click', () => {
    addPokemonToPreviewBox(logic.getRandomPokemon());
  });
}

async function fetchPokemonDataByName(pokemonName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await res.json();
}
retrieveAllPokemonsToDB();
addEventListenersForSearch();
