export class Pokemon {
  pictureSrc: string | null;
  id: number | null;
  name: string | null;
  pokemonType: string | null;
  height: string | null;
  weight: string | null;
  moves: string | null;
  rawData: any;

  constructor(name: string) {
    this.rawData = this.getDataFromLocalStorage();
    this.pictureSrc = null;
    this.id = null;
    this.name = name;
    this.pokemonType = null;
    this.height = null;
    this.weight = null;
    this.moves = null;
  }

  async fetchPokemonData() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
    const pokemonDataJSON = await res.json();
    this.id = pokemonDataJSON.id;
    this.height = pokemonDataJSON.height;
    this.weight = pokemonDataJSON.weight;
    this.pictureSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.id}.png`;
    this.pokemonType = pokemonDataJSON.types[0].type.name;
  }
  getDataFromLocalStorage(): object {
    return JSON.parse(localStorage.getItem('pokemonsData') as string);
  }
}
