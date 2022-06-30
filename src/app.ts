async function getPokemonList() {
  for (let i = 0; i < 3; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${12}&offset=${i*12}`);
    const pokemonsJSON = await res.json();
    const pokemonArr = pokemonsJSON.results.map((obj: object) => {
      return obj;
    });
    console.log(pokemonArr);
  }
}
getPokemonList();
