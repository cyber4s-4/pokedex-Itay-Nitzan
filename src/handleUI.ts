import { Logic } from './Logic';
import { Pokemon } from './Pokemon';
const logic = new Logic();

export class HandleUi {
  createAndDisplayPokemons() {
    const pokemon_count = logic.totalNUmberOfPokemons();
    for (let i = 1; i <= pokemon_count; i++) {
      this.createPokemonCard(logic.getPokemonById(i));
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
    const poke_container = document.getElementsByClassName('poke-container-body')[0] as HTMLElement;
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

    poke_container.appendChild(pokemonCard);
  };

  getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  searchPok() {
    let pokemon;
    if (pokemon == undefined) {
      pokemon = 'pikachu';
      this.api(pokemon);
    } else {
      this.api(pokemon);
    }
  }
  api(pokemon: string) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((data) => {
        const pic = document.querySelector('#pokeimg') as HTMLImageElement;
        pic.src = data.sprites.front_default;
        document.getElementById('name')!.innerText = data.name;
        const type = document.querySelector('#type') as HTMLElement;
        type.textContent = `${data.types[0].type.name} type pokemon`;
        const moves = document.querySelector('#moves-list') as HTMLElement;
        for (let i = 0; i < 6; i++) {
          const li = moves.querySelectorAll('li')[i];
          li.innerText = data.moves[i * 8].move.name;
        }
        const height = document.querySelector('#height') as HTMLElement;
        height.innerText = `Height: ${data.height}`;
        const weight = document.querySelector('#weight') as HTMLElement;
        weight.innerText = `Weight: ${data.weight}`;
        const form = document.querySelector('form');
        form!.addEventListener('submit', this.search);
      });
  }
  search(e: any) {
    e.preventDefault();
    const pokeName = document.querySelector('input')!.value.toLowerCase();
    this.api(pokeName);
  }
}
