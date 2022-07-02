export class Pokemon {
  pictureSrc: string | null;
  id: number | null;
  name: string | null;
  pokemonType: string | null;
  height: string | null;
  weight: string | null;
  moves: string[] | null;
  rawData: any;

  constructor(name: string, pokemonRawData: object) {
    this.name = name;
    this.rawData = pokemonRawData;
    this.id = this.rawData.id;
    this.height = this.rawData.height;
    this.weight = this.rawData.weight;
    this.moves = this.rawData.moves
      .map((moveObj: { move: { name: string } }) => {
        return moveObj.move.name;
      })
      .slice(0, 6);
    this.pictureSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.id}.png`;
    this.pokemonType = this.rawData.types[0].type.name;
  }
}
