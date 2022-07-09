const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

let favorites = [];

app.get('/pokemons', (req, res) => {
  try {
    return res.status(201).send(JSON.parse(fs.readFileSync('pokemonData.json', 'utf8')));
  } catch {
    return res.status(400).send({ message: 'Error' });
  }
});

app.get('/:searchValue', (req, res) => {
  // If request contains a number
  if (!isNaN(Number(req.params.searchValue))) {
    try {
      const pokemonID = Number(req.params.searchValue);
      const dataPokemon = JSON.parse(fs.readFileSync('pokemonData.json', 'utf8'));
      const pokemonSearchResult = dataPokemon.find((pokemon) => pokemon.id === pokemonID);
      if (pokemonSearchResult) {
        return res.status(201).send(pokemonSearchResult);
      } else {
        return res.status(400).send({ message: 'Pokemon not found' });
      }
    } catch {
      return res.status(400).send({ message: 'Error' });
    }
    // If request contains a string
  } else {
    try {
      const pokemonName = req.params.searchValue.toLowerCase();
      const dataPokemon = JSON.parse(fs.readFileSync('pokemonData.json', 'utf8'));
      const pokemonSearchResult = dataPokemon.find((pokemon) => pokemon.name === pokemonName);
      if (pokemonSearchResult) {
        return res.status(201).send(pokemonSearchResult);
      } else {
        return res.status(400).send({ message: 'Pokemon not found' });
      }
    } catch {
      return res.status(400).send({ message: 'Error' });
    }
  }
});

app.post('/star', async (req, res) => {
  try {
    const dataPokemon = JSON.parse(fs.readFileSync('pokemonData.json', 'utf8'));
    const pokemonSearch = favorites.find((pokemon) => pokemon.name === req.body.name);
    if (pokemonSearch) {
      const position = favorites.indexOf(pokemonSearch);
      favorites.splice(position, 1);
      return res.status(202).send({ message: 'Removed from favorites' });
    } else {
      const pokemonSearch = dataPokemon.find((pokemon) => pokemon.name === req.body.name);
      favorites.push(pokemonSearch);
      res.status(201).send({ message: 'Added to favorites' });
    }
  } catch {
    res.status(500).send({ message: 'Error' });
  }
});

app.get('/star/star', async (req, res) => {
  try {
    return res.status(201).send(favorites);
  } catch {
    return res.status(400).send({ message: 'Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
