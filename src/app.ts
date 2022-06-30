import { Pokemon } from './Pokemon';

function api(pokemon: string) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
      const pic = document.querySelector('#pokeimg') as HTMLImageElement;
      pic.src = data.sprites.front_default; // TODO
      (document.getElementById('name') as HTMLElement).innerText = data.name; // TODO
      const type = document.querySelector('#type') as HTMLElement;
      type.textContent = `${data.types[0].type.name} type pokemon`; // TODO
      const height = document.querySelector('#height') as HTMLElement;
      height.innerText = `Height: ${data.height}`; // TODO
      const weight = document.querySelector('#weight') as HTMLElement;
      weight.innerText = `Weight: ${data.weight}`; // TODO
      const submit = document.querySelector('.submit') as HTMLElement;
      submit.addEventListener('click', search);
    });
}

function search(e: any) {
  e.preventDefault();
  const pokeName = (document.querySelector('input') as HTMLInputElement).value.toLowerCase();
  api(pokeName);
}

async function getPokemonList() {
  for (let i = 0; i < 3; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${12}&offset=${i * 12}`);
    const pokemonsJSON = await res.json();
    const pokemonArr = pokemonsJSON.results.map((obj: object) => {
      return obj;
    });
    console.log(pokemonArr);
  }
}
getPokemonList();
const pikachu = new Pokemon('pikachu');
console.log(pikachu);
