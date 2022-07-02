import { Pokemon } from './Pokemon';

export class Logic {
  totalNUmberOfPokemons() {
    return 905;
  }
  getPokemonById(id: number): Pokemon {
    return this.getPokemonArrFromLocalStorage()[id - 1];
  }

  getPokemonArrFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pokemonsData') as string);
  }
}
