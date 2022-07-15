import { HandleUi, addPokemonToPreviewBox, handleInputEntered } from './HandleUi';
import { Pokemon } from './Pokemon';
import { Logic } from './Logic';

const logic = new Logic();
const handleUi = new HandleUi();

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
  // addScrollToBottomEventListener();
}


// function addScrollToBottomEventListener() {
//   let i = 20;
//   window.onscroll = async function () {
//     if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
//       try {
//         console.log(i);
//         const response = await fetch(`/pokemons?offset=${i}&limit=20`);
//         const pokemonArr = await response.json();
//         handleUi.createAndDisplayPokemons(pokemonArr);
//         i += 20;
//       } catch (err) {
//         console.log('Error in retrieving pokemons from server.');
//         throw err;
//       } finally {
//         console.log('Finished retrieving data from the server.');
//       }
//     }
//   }
// }


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
