export class Pokemon {
  pictureSrc: string[];
  id: number;
  name: string;
  pokemonTypes: string[];
  height: string;
  weight: string;
  moves: string[];
  spritesSources: {
    frontDefault: string;
    backDefault: string;
    frontShiny: string;
    backShiny: string;
  };
  visualId: string;
  isFavorite: boolean;

  constructor(pokemon: Pokemon) {
    this.name = pokemon.name;
    this.id = pokemon.id;
    this.height = pokemon.height;
    this.weight = pokemon.weight;
    this.moves = pokemon.moves;
    this.visualId = pokemon.visualId;
    this.pictureSrc = pokemon.pictureSrc;
    this.pokemonTypes = pokemon.pokemonTypes;
    this.spritesSources = pokemon.spritesSources;
    this.isFavorite = pokemon.isFavorite;
  }
}
