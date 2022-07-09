import { HandleUi, addPokemonToPreviewBox, handleInputEntered } from './HandleUi';
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
    // TODO: Make fetching each pokemon async.
    for (let i = 0; i < pokemonJSON.results.length; i++) {
      const pokemonRawData = await fetchPokemonDataByName(pokemonJSON.results[i].name);
      const newPokemon = new Pokemon(pokemonJSON.results[i].name, pokemonRawData);
      pokemonArr.push(newPokemon);
    }
    localStorage.setItem('pokemonsData', JSON.stringify(pokemonArr));
    console.log('Finished retrieving all the data from the API.');
    // Otherwise, get the pokemon array from the local storage.
  } else {
    pokemonArr = JSON.parse(localStorage.getItem('pokemonsData') as string);
    console.log('Retrieved data from local storage.');
  }
  handleUi.finishLoadingUI();
  handleUi.createAndDisplayPokemons(pokemonArr);
  // Add random pokemon to preview box once the site has loaded.
  addPokemonToPreviewBox(await logic.getRandomPokemon());
}

function addEventListenersForSearch() {
  // Listen to form search
  const searchInput = document.getElementsByClassName('search-container')[0];
  searchInput.addEventListener('submit', (e) => {
    e.preventDefault();
    handleInputEntered();
  })
  // Listen to search icon click
  const submitIcon = document.querySelector('.search-icon') as HTMLElement;
  submitIcon.addEventListener('click', handleInputEntered);

  // Listen for random pokemon search
  const getRandomPokemonBtn = document.querySelector('.get-random') as HTMLButtonElement;
  getRandomPokemonBtn.addEventListener('click', async () => {
    addPokemonToPreviewBox(await logic.getRandomPokemon());
  });
}

async function fetchPokemonDataByName(pokemonName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await res.json();
}

retrieveAllPokemonsToDB();
addEventListenersForSearch();