import { Logic } from './Logic';
import { Pokemon } from './Pokemon';
const logic = new Logic();

export class HandleUi {
  createAndDisplayPokemons() {
    const pokemon_count = logic.totalNUmberOfPokemons();
    for (let i = 1; i <= pokemon_count; i++) {
      this.createPokemonCard(logic.getPokemonById(i) as Pokemon);
    }
  }
  createPokemonCard = (pokemon: Pokemon) => {
    const colors = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5',
    };
    const main_types = Object.keys(colors);
    const pokeContainer = document.getElementsByClassName('poke-container-body')[0] as HTMLElement;
    const pokemonCard = document.createElement('div');
    const id = pokemon.id.toString();
    pokemonCard.id = id;
    pokemonCard.classList.add('pokemon');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1).replace('-', ' ');
    const visualId = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.pokemonTypes;

    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonCard.style.backgroundColor = color;

    pokemonCard.innerHTML = `
        <img class="star" id=${id} src="https://cdn-icons-png.flaticon.com/512/188/188931.png" alt="Add To Favorites" width="32" height="32">
        <div class="img-parent">
        <div class="img-container">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${visualId}.png" alt="">
        </div>
        </div>
        <div class="info">
        <span class="number">#${visualId}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
        </div>`;

    const star = pokemonCard.querySelector('.star') as HTMLElement;
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      star.classList.toggle('star-selected');
    });
    pokeContainer.appendChild(pokemonCard);
    pokemonCard.addEventListener('click', () => {
      addPokemonToPreviewBox(pokemon);
      const pokePreview = document.querySelector('.poke-preview') as HTMLElement;
      pokePreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
}
export function addPokemonToPreviewBox(pokemon: Pokemon) {
  const pic = document.querySelector('#pokeimg') as HTMLImageElement;

  pic.src = pokemon.spritesSources.frontDefault;
  function spinShiny() {
    const spinButton = document.getElementsByClassName('spin')[0];
    const shinyButton = document.getElementsByClassName('shiny')[0];
    const pokeImgRegularFront = pokemon.spritesSources.frontDefault;
    const pokeImgRegularBack = pokemon.spritesSources.backDefault;
    const pokeImgShinyFront = pokemon.spritesSources.frontShiny;
    const pokeImgShinyBack = pokemon.spritesSources.backShiny;
    spinButton.addEventListener('click', () => {
      console.log('spin', pic.src);
      if (pokeImgRegularBack !== null) {
        if ((pic.src = pokeImgRegularFront)) {
          pic.src = pokeImgRegularBack;
          return;
        }
        if ((pic.src = pokeImgRegularBack)) {
          console.log('Back to regular front');

          pic.src = pokeImgRegularFront;
          return;
        }
        if ((pic.src = pokeImgShinyFront)) {
          pic.src = pokeImgShinyBack;
          return;
        }
        if ((pic.src = pokeImgShinyBack)) {
          pic.src = pokeImgShinyFront;
          return;
        }
      } else {
        return;
      }
    });
    shinyButton.addEventListener('click', () => {
      console.log('shine/unshine');
      if (pokeImgShinyFront && pokeImgShinyBack !== null) {
        if ((pic.src = pokeImgRegularFront)) {
          pic.src = pokeImgShinyFront;
          return;
        }
        if ((pic.src = pokeImgRegularBack)) {
          pic.src = pokeImgShinyBack;
          return;
        }
        if ((pic.src = pokeImgShinyFront)) {
          pic.src = pokeImgRegularFront;
          return;
        }
        if ((pic.src = pokeImgShinyBack)) {
          pic.src = pokeImgRegularBack;
          return;
        }
      } else {
        return;
      }
    });
  }
  spinShiny();
  const nameEl = document.getElementById('name') as HTMLElement;
  nameEl.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1).replace('-', ' ');
  const type = document.querySelector('#type') as HTMLElement;
  type.textContent = `${
    pokemon.pokemonTypes[0][0].toUpperCase() + pokemon.pokemonTypes[0].slice(1)
  } type pokemon`;
  const moves = document.querySelector('#moves-list') as HTMLElement;
  for (let i = 0; i < 6; i++) {
    const li = moves.querySelectorAll('li')[i];
    li.innerText = pokemon.moves[i];
  }
  const height = document.querySelector('#height') as HTMLElement;
  height.innerText = `Height: ${pokemon.height}`;
  const weight = document.querySelector('#weight') as HTMLElement;
  weight.innerText = `Weight: ${pokemon.weight}`;
}

export function handleInputEntered() {
  const inputEl = document.querySelector('.search-input') as HTMLInputElement;
  if (isNaN(Number(inputEl.value))) {
    const searchResult = logic.getPokemonByName(inputEl.value);
    if (searchResult !== null) addPokemonToPreviewBox(searchResult);
  } else {
    const searchResult = logic.getPokemonById(Number(inputEl.value));
    if (searchResult !== null) addPokemonToPreviewBox(searchResult);
  }
}
