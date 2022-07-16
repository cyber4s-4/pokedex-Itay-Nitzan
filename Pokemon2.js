module.exports = class Pokemon2 {
  constructor(name, pokemonRawData) {
    this.name = name;
    this.rawData = pokemonRawData;
    this.id = this.rawData.id;
    this.height = this.rawData.height;
    this.weight = this.rawData.weight;
    this.isFavorite = false;
    this.moves = this.rawData.moves
      .map((moveObj) => {
        return moveObj.move.name;
      })
      .slice(0, 6);
    this.visualId = this.id.toString().padStart(3, "0");
    this.pictureSrc =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
      this.visualId +
      ".png";
    this.pokemonTypes = this.rawData.types.map((typeObj) => {
      return typeObj.type.name !== undefined ? typeObj.type.name : "Unknown";
    });
    this.spritesSources = {
      frontDefault: this.rawData.sprites["front_default"],
      backDefault: this.rawData.sprites["back_default"],
      frontShiny: this.rawData.sprites["front_shiny"],
      backShiny: this.rawData.sprites["back_shiny"],
    };
    this.stats = {
      hp: this.rawData.stats[0].base_stat,
      attack: this.rawData.stats[1].base_stat,
      defense: this.rawData.stats[2].base_stat,
      specialAttack: this.rawData.stats[3].base_stat,
      specialDefense: this.rawData.stats[4].base_stat,
      speed: this.rawData.stats[5].base_stat,
    };
    this.rawData = null;
  }
};
