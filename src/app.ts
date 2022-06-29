async function first20Pokemons() {
  for (let i = 1; i <= 1; i++) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemonsJSON = await res.json();
    const pokemonArr = pokemonsJSON.results.map((obj: object) => {
      return obj.name;
    });
    console.log(pokemonArr);
  }
}
first20Pokemons();
