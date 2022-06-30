export class Pokemon {
  name: string;
  height: string | null;
  pictureSrc: string | null;
  pokemonType: string | null;
  weight: string | null;
  id: number | null;
  constructor(name: string) {
    this.name = name;
    this.id = null;
    this.height = null;
    this.weight = null;
    this.pictureSrc = null;
    this.pokemonType = null;
    this.fetchPokemonData();
    this.createPokemonHtmlCard();
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

  // TODO: function incomplete, will finish after lunch!
  createPokemonHtmlCard() {
    const blabla = document.createElement('div');
    const pokemonCard = document.createElement('div');
    const picture = document.createElement('image');
    const id = document.createElement('p');
    const name = document.createElement('p');
    const typeSection = document.createElement('section');
  }
}
