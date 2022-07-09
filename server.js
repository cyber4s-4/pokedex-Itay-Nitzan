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

app.get("/:searchValue", (req, res) => {
  // If request containes a number
  if (!isNaN(Number(req.params.searchValue))) {
    try {
      const pokemonID = Number(req.params.searchValue);
      const dataPokemon = JSON.parse(
        fs.readFileSync("pokemonData.json", "utf8")
      );
      const pokemonSearchResult = dataPokemon.find(
        (pokemon) => pokemon.id === pokemonID
      );
      if (pokemonSearchResult) {
        return res.status(201).send(pokemonSearchResult);
      } else {
        return res.status(400).send({ message: "Pokemon not found" });
      }
    } catch {
      return res.status(400).send({ message: "Error" });
    }
    // If request containes a string
  } else {
    try {
      const pokemonName = req.params.searchValue.toLowerCase();
      const dataPokemon = JSON.parse(
        fs.readFileSync("pokemonData.json", "utf8")
      );
      const pokemonSearchResult = dataPokemon.find(
        (pokemon) => pokemon.name === pokemonName
      );
      if (pokemonSearchResult) {
        return res.status(201).send(pokemonSearchResult);
      } else {
        return res.status(400).send({ message: "Pokemon not found" });
      }
    } catch {
      return res.status(400).send({ message: "Error" });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
