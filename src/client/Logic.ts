import { Pokemon } from './Pokemon';

export class Logic {
  totalNUmberOfPokemons() {
    return 905;
  }
  async getPokemonById(id: number): Promise<Pokemon> {
    try {
      const response = await fetch(`/${id}`);
      return await response.json();
    } catch (err) {
      console.log('Error in retrieving pokemon from server.');
      throw err;
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const response = await fetch(`/${name}`);
      return await response.json();
    } catch (err) {
      console.log('Error in retrieving pokemon from server.');
      throw err;
    }
  }

  async getPokemonArr(): Promise<Pokemon[]> {
    try {
      const response = await fetch('/pokemons');
      return await response.json();
    } catch (err) {
      console.log('Error in retrieving pokemon from server.');
      throw err;
    }
  }

  async getFavoritesArr(): Promise<Pokemon[]> {
    try {
      const response = await fetch('/star/star');
      return await response.json();
    } catch (err) {
      console.log('Error in retrieving pokemon from server.');
      throw err;
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomNumber = Math.floor(Math.random() * (this.totalNUmberOfPokemons() + 1));
    const randomPokemon: Pokemon = await this.getPokemonById(randomNumber);
    return randomPokemon;
  }

  addFavorite(pokemon: string) {
    fetch('/star', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: pokemon.toLowerCase(),
      }),
    }).catch((res) => {
      console.log(res.message);
    });
  }

  sortPokemons(sortId: string, pokemonArr: Pokemon[]): Pokemon[] {
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
        return pokemonArr;
    }
  }

  sortPokemonsByIdLowToHigh(pokemonArr: Pokemon[]) {
    return pokemonArr.sort((pokemonA, pokemonB) => {
      return Number(pokemonA.id) - Number(pokemonB.id);
    });
  }

  sortPokemonsByIdHighToLow(pokemonArr: Pokemon[]) {
    return pokemonArr.sort((pokemonA, pokemonB) => {
      return Number(pokemonB.id) - Number(pokemonA.id);
    });
  }

  sortPokemonsAlphabeticallyAtoZ(pokemonArr: Pokemon[]) {
    return pokemonArr.sort((pokemonA, pokemonB) => {
      return pokemonA.name.localeCompare(pokemonB.name);
    });
  }

  sortPokemonsAlphabeticallyZtoA(pokemonArr: Pokemon[]) {
    return pokemonArr.sort((pokemonA, pokemonB) => {
      return pokemonB.name.localeCompare(pokemonA.name);
    });
  }
}
