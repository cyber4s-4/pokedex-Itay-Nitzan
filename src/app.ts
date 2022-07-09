import { HandleUi, addPokemonToPreviewBox, handleInputEntered } from './HandleUi';
import { Pokemon } from './Pokemon';
import { Logic } from './Logic';

const logic = new Logic();
const handleUi = new HandleUi();

async function retrieveAllPokemonsFromDB() {
  let pokemonArr: Pokemon[] = [];
  console.log('Retrieving data from the server...');
  pokemonArr = await logic.getPokemonArrFromServer();
  console.log('Finished retrieving data from the server.');
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
  });
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

retrieveAllPokemonsFromDB();
addEventListenersForSearch();
