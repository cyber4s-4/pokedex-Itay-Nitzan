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
    const pokemon = this.getPokemonArrFromLocalStorage().find(
      (pokemonObj: Pokemon) => pokemonObj.name === name.toLowerCase()
    );
    if (pokemon !== undefined) return pokemon;
    console.log('No such pokemon was found.');
    return null;
  }

  getPokemonArrFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pokemonsData') as string);
  }

  getRandomPokemon(): Pokemon {
    const randomNumber = Math.floor(Math.random() * (this.totalNUmberOfPokemons() + 1));
    const randomPokemon: Pokemon = this.getPokemonById(randomNumber);
    return randomPokemon;
  }

  sortPokemons(sortId: string, pokemonArr: Pokemon[]) {
    switch (sortId) {
      case 'sortIdLowToHigh':
        return this.sortPokemonsByIdLowToHigh(pokemonArr);
      case 'sortIdHighToLow':
        return this.sortPokemonsByIdHighToLow(pokemonArr);
      case 'sortAtoZ':
        return this.sortPokemonsAlphabeticallyAtoZ(pokemonArr);
      case 'sortZtoA':
        return this.sortPokemonsAlphabeticallyZtoA(pokemonArr);

      default:
        console.log('Unrecognized sort name');
        return;
    }
  }

  sortPokemonsByIdLowToHigh(pokemonArr: Pokemon[]) {
    const sortedPokemonArr = pokemonArr.sort((pokemonA, pokemonB) => {
      return Number(pokemonA.id) - Number(pokemonB.id);
    });
    return sortedPokemonArr;
  }

  sortPokemonsByIdHighToLow(pokemonArr: Pokemon[]) {
    const sortedPokemonArr = pokemonArr.sort((pokemonA, pokemonB) => {
      return Number(pokemonB.id) - Number(pokemonA.id);
    });
    return sortedPokemonArr;
  }

  sortPokemonsAlphabeticallyAtoZ(pokemonArr: Pokemon[]) {
    const sortedPokemonArr = pokemonArr.sort((pokemonA, pokemonB) => {
      return pokemonA.name.localeCompare(pokemonB.name);
    });
    return sortedPokemonArr;
  }

  sortPokemonsAlphabeticallyZtoA(pokemonArr: Pokemon[]) {
    const sortedPokemonArr = pokemonArr.sort((pokemonA, pokemonB) => {
      return pokemonB.name.localeCompare(pokemonA.name);
    });
    return sortedPokemonArr;
  }
}
