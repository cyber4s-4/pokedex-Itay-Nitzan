import { HandleUi, addPokemonToPreviewBox, handleInputEntered } from './HandleUi';
import { Pokemon } from './Pokemon';
import { Logic } from './Logic';

const logic = new Logic();
const handleUi = new HandleUi();

declare global {
  interface window {
    isFavourite: boolean;
    sortBy: 'A2Z' | 'Z2A' | 'h2l' | 'l2h';
  }
}

async function retrieve20PokemonsFromDB() {
  try {
    console.log('Retrieving data from the server...');
    const response = await fetch('/pokemons?offset=0&limit=20');
    const pokemonArr = await response.json();
    handleUi.finishLoadingUI();
    handleUi.createAndDisplayPokemons(pokemonArr);
  } catch (err) {
    console.log('Error in retrieving pokemons from server.');
    throw err;
  } finally {
    console.log('Finished retrieving data from the server.');
  }
  // Add random pokemon to preview box once the site has loaded.
  addPokemonToPreviewBox(await logic.getRandomPokemon());
}

const body = document.getElementsByTagName('body')[0];
window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // show the loading animation
    body.classList.add('stop-scrolling');
    await showLoading();
    body.classList.remove('stop-scrolling');
  }
});

let i = 20;
async function get20MorePokemons() {
  try {
    const response = await fetch(
      `/pokemons?offset=${i}&limit=20${window.sortBy ? `&sort=${window.sortBy}` : ''}`
    );
    const pokemonArr = await response.json();
    handleUi.createAndDisplayPokemons(pokemonArr);
    i += 20;
  } catch (err) {
    console.log('Error in retrieving pokemons from server.');
    throw err;
  } finally {
    console.log('Finished retrieving data from the server.');
  }
}

const loading = document.querySelector('.loading') as HTMLDivElement;
async function showLoading() {
  if (!window.isFavourite) {
    loading.classList.add('show');
    await get20MorePokemons();
    loading.classList.remove('show');
  }
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

retrieve20PokemonsFromDB();
addEventListenersForSearch();
