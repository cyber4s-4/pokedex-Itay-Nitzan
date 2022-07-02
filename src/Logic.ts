import { Pokemon } from './Pokemon';

export class Logic {
  totalNUmberOfPokemons() {
    return 905;
  }
  getPokemonById(id: number): Pokemon | null {
    const pokemon = this.getPokemonArrFromLocalStorage()[id - 1];
    if (pokemon !== undefined) return pokemon;
    console.log('No such pokemon was found.');
    return null;
  }

  getPokemonByName(name: string): Pokemon | null {
    let pokemon;
    this.getPokemonArrFromLocalStorage().forEach((pokemonObj: Pokemon) => {
      if (pokemonObj.name === name) pokemon = pokemonObj;
    });
    if (pokemon !== undefined) return pokemon;
    console.log('No such pokemon was found.');
    return null;
  }

  getPokemonArrFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pokemonsData') as string);
  }

  getRandomPokemon(): Pokemon {
    const randomNumber = Math.floor(Math.random() * (this.totalNUmberOfPokemons() + 1));
    const randomPokemon = this.getPokemonById(randomNumber);
    return randomPokemon!;
  }
}
