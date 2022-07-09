const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const fetch = require("cross-fetch");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

let favorites = [];

app.get("/:pokemon", (req, res) => {
  try {
    const pokemonName = req.params.pokemon.toLowerCase();
    const dataPokemon = JSON.parse(fs.readFileSync("pokemonData.json", "utf8"));
    const pokemonSearch = dataPokemon.find(
      (pokemon) => pokemon.name === pokemonName
    );
    if (pokemonSearch) {
      return res.status(201).send({
        name: pokemonSearch.name,
        rawData: null,
        id: pokemonSearch.id,
        height: pokemonSearch.height,
        weight: pokemonSearch.weight,
        moves: pokemonSearch.moves,
        visualId: pokemonSearch.visualId,
        pictureSrc: pokemonSearch.pictureSrc,
        pokemonTypes: pokemonSearch.pokemonTypes,
        spritesSources: pokemonSearch.spritesSources,
      });
    } else {
      return res.status(400).send({ message: "Pokemon not found" });
    }
  } catch {
    return res.status(400).send({ message: "Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
