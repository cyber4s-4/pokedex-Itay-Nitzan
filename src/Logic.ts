import { Pokemon } from './Pokemon';

export class Logic {
  totalNUmberOfPokemons() {
    return 905;
  }
  async getPokemonByIdFromServer(id: number): Promise<Pokemon> {
    try {
      const response = await fetch(`http://localhost:3000/${id}`)
      const pokemonData = await response.json();
      return pokemonData;
    } catch {
      console.log('Error in retrieving pokemon from server.');
    }
  }

  async getPokemonByNameFromServer(name: string): Promise<Pokemon> {
    try {
      const response = await fetch(`http://localhost:3000/${name}`)
      const pokemonData = await response.json();
      return pokemonData;
    } catch {
      console.log('Error in retrieving pokemon from server.');
    }
  }

  async getPokemonArrFromServer(): Promise<Pokemon[]> {
    try {
      const response = await fetch('http://localhost:3000/pokemons');
      const pokemonArr = await response.json();
      return pokemonArr;
    } catch {
      console.log('Error in retrieving pokemon array from server.');
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomNumber = Math.floor(Math.random() * (this.totalNUmberOfPokemons() + 1));
    const randomPokemon: Pokemon = await this.getPokemonByIdFromServer(randomNumber);
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
