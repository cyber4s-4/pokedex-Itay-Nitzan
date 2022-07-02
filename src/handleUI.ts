import { api } from "./app";
export function createAndDisplayPokemons() {

    const poke_container = document.getElementsByClassName('poke-container-body')[0];
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
        normal: '#F5F5F5'
    }

    const main_types = Object.keys(colors);

    const fetchPokemons = async () => {
        for (let i = 1; i <= pokemon_count; i++) {
            await getPokemon(i);
        }
    }

    const getPokemon = async (id: number) => {
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await url.json();
        createPokemonCard(data);
    }

    const createPokemonCard = (pokemon: any) => {
        const pokemonEl = document.createElement('div') as HTMLDivElement;
        pokemonEl.classList.add('pokemon');
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const id = pokemon.id.toString().padStart(3, '0');
        const poke_types = pokemon.types.map((type: any) => type.type.name);
        const type = main_types.find(type => poke_types.indexOf(type) > -1);
        const color = colors[type];

        pokemonEl.style.backgroundColor = color;

        pokemonEl.innerHTML = `
        <div class="img-parent">
        <div class="img-container">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="">
        </div>
        </div>
        <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
        </div>`

        poke_container.appendChild(pokemonEl);
    }

    async function cardClickEvent() {
        await fetchPokemons();
        const pokemonCards = Array.from(document.getElementsByClassName("pokemon"));

        for (let i = 0; i < pokemonCards.length; i++) {
            pokemonCards[i].addEventListener('click', () => {
                const name = pokemonCards[i].getElementsByClassName("name")[0].innerHTML.toLowerCase();
                api(name);
            });
        }
    }

    function getRandom(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return randomNumber;
    }


    function randomSearch() {
        const randomButton = document.getElementsByClassName('random')[0];
        randomButton.addEventListener('click', () => {
            api(getRandom(1, pokemon_count).toString())
        });
    }
    cardClickEvent();
    randomSearch();
}

