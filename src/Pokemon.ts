export class Pokemon {
  pictureSrc: string;
  id: number;
  name: string;
  pokemonTypes: string[];
  height: string;
  weight: string;
  moves: string[];
  rawData: any;
  visualId: string;

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
    this.visualId = this.id.toString().padStart(3, '0');
    this.pictureSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.visualId}.png`;
    this.pokemonTypes = this.rawData.types.map((typeObj: any) => {
      return typeObj.type.name;
    });
    this.rawData = null;
  }
}
