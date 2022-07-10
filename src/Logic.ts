import { Pokemon } from './Pokemon';

export class Logic {
  totalNUmberOfPokemons() {
    return 905;
  }
  async getPokemonById(id: number): Promise<Pokemon> {
    try {
      const response = await fetch(`/${id}`);
      const pokemonData = await response.json();
      return pokemonData;
    } catch {
      console.log('Error in retrieving pokemon from server.');
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const response = await fetch(`/${name}`);
      const pokemonData = await response.json();
      return pokemonData;
    } catch {
      console.log('Error in retrieving pokemon from server.');
    }
  }

  async getPokemonArr(): Promise<Pokemon[]> {
    try {
      const response = await fetch('/pokemons');
      const pokemonArr = await response.json();
      return pokemonArr;
    } catch {
      console.log('Error in retrieving pokemon array from server.');
    }
  }

  async getFavoritesArr(): Promise<Pokemon[]> {
    try {
      const response = await fetch('/star/star');
      const favoritesArray = await response.json();
      return favoritesArray;
    } catch {
      console.log('Error in retrieving pokemon array from server.');
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomNumber = Math.floor(Math.random() * (this.totalNUmberOfPokemons() + 1));
    const randomPokemon: Pokemon = await this.getPokemonById(randomNumber);
    return randomPokemon;
  }

  addFavorite(pokemon: Pokemon) {
    fetch('/star', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: pokemon.name,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res.message);
      });
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

