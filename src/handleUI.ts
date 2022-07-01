export function createAndDisplayPokemons() {
  const poke_container = document.getElementsByClassName('poke-container-body')[0] as HTMLElement;
  const pokemon_count = 100;
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

  const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
      await getPokemon(i);
    }
  };

  const getPokemon = async (id: number) => {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await url.json();
    createPokemonCard(data);
  };

  const createPokemonCard = (pokemon: any) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map((type: any) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonCard.style.backgroundColor = color;

    pokemonCard.innerHTML = `
        <div class="img-parent">
        <div class="img-container">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="">
        </div>
        </div>
        <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
        </div>`;

    poke_container.appendChild(pokemonCard);
  };

  fetchPokemons();

  function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }
}

export function searchPok() {
  let pokemon;
  if (pokemon == undefined) {
    pokemon = 'pikachu';
    api(pokemon);
  } else {
    api(pokemon);
  }
  function api(pokemon: string) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((data) => {
        let pic = document.querySelector('#pokeimg') as HTMLImageElement;
        pic.src = data.sprites.front_default;
        document.getElementById('name')!.innerText = data.name;
        let type = document.querySelector('#type') as HTMLElement;
        type.textContent = `${data.types[0].type.name} type pokemon`;
        let moves = document.querySelector('#moves-list') as HTMLElement;
        for (let i = 0; i < 6; i++) {
          let li = moves.querySelectorAll('li')[i];
          li.innerText = data.moves[i * 8].move.name;
        }
        let height = document.querySelector('#height') as HTMLElement;
        height.innerText = `Height: ${data.height}`;
        let weight = document.querySelector('#weight') as HTMLElement;
        weight.innerText = `Weight: ${data.weight}`;
        let form = document.querySelector('form');
        form!.addEventListener('submit', search);
        function search(e: any) {
          e.preventDefault();
          let pokeName = document.querySelector('input')!.value.toLowerCase();
          api(pokeName);
        }
      });
  }
}
