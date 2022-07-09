const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const fetch = require("cross-fetch");
const Pokemon2 = require("./Pokemon2");
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

app.get("/pokemons", async (req, res) => {
  // Enter if pokemonData does exist and send it back.
  if (fs.existsSync("pokemonData.json")) {
    try {
      return res
        .status(201)
        .send(JSON.parse(fs.readFileSync("pokemonData.json", "utf8")));
    } catch {
      return res.status(400).send({ message: "Error" });
    }
    // Enter if pokemonData DOES NOT exist, fetch it from API and send it back to client.
  } else {
    try {
      const pokemonArr = [];
      console.log("Retrieving data from API...");
      // Get list of all pokemons names and urls.
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2");
      const pokemonJSON = await res.json();
      for (let i = 0; i < pokemonJSON.results.length; i++) {
        const pokemonRawData = await fetchPokemonDataByName(
          pokemonJSON.results[i].name
        );
        const newPokemon = new Pokemon2(
          pokemonJSON.results[i].name,
          pokemonRawData
        );
        pokemonArr.push(newPokemon);
      }
      fs.writeFile("./pokemonData.json", JSON.stringify(pokemonArr), (err) => {
        if (err) {
          throw new Error("File was not created.");
        }
        console.log("JSON written to file.");
      });
      return res
        .status(201)
        .send(JSON.parse(fs.readFileSync("pokemonData.json", "utf8")));
    } catch {
      return res.status(400).send({ message: "Error" });
    }
  }
});

app.get("/:searchValue", (req, res) => {
  // If request contains a number
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
    // If request contains a string
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

app.post("/star", async (req, res) => {
  try {
    const dataPokemon = JSON.parse(fs.readFileSync("pokemonData.json", "utf8"));
    const pokemonSearch = favorites.find(
      (pokemon) => pokemon.name === req.body.name
    );
    if (pokemonSearch) {
      const position = favorites.indexOf(pokemonSearch);
      favorites.splice(position, 1);
      return res.status(202).send({ message: "Removed from favorites" });
    } else {
      const pokemonSearch = dataPokemon.find(
        (pokemon) => pokemon.name === req.body.name
      );
      favorites.push(pokemonSearch);
      res.status(201).send({ message: "Added to favorites" });
    }
  } catch {
    res.status(500).send({ message: "Error" });
  }
});

app.get("/star/star", async (req, res) => {
  try {
    return res.status(201).send(favorites);
  } catch {
    return res.status(400).send({ message: "Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function fetchPokemonDataByName(pokemonName) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await res.json();
}
