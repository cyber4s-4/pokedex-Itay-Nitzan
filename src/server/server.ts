const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
import {
  getPokemonSearch,
  getAllStars,
  RemoveStars,
  AddStars,
  SearchStars,
  get20Pokemons,
} from './mongo';
import { Request, Response } from 'express';
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const favorites: object[] = [];

app.get('/pokemons', async (req: Request, res: Response) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = 20;
    const response = await get20Pokemons(offset, limit);
    return res.status(201).json(response);
  } catch {
    return res.status(400).send({ message: 'Error' });
  }
});

app.get('/:searchValue', async (req: Request, res: Response) => {
  // If request contains a number
  if (!isNaN(Number(req.params.searchValue))) {
    try {
      const pokemonID = Number(req.params.searchValue);
      const dataPokemon = await getPokemonSearch(pokemonID);
      if (!dataPokemon) {
        return res.status(400).send({ message: 'Pokemon not found' });
      } else {
        return res.status(201).json(dataPokemon);
      }
    } catch {
      return res.status(400).send({ message: 'Error' });
    }
    // If request contains a string
  } else {
    try {
      const pokemonName = req.params.searchValue.toLowerCase();
      const dataPokemon = await getPokemonSearch(pokemonName);
      if (!dataPokemon) {
        return res.status(400).send({ message: 'Pokemon not found' });
      } else {
        return res.status(201).json(dataPokemon);
      }
    } catch {
      return res.status(400).send({ message: 'Error' });
    }
  }
});

app.post('/star', async (req: Request, res: Response) => {
  try {
    const pokemonSearch = await SearchStars(req.body.name.toLowerCase());
    if (pokemonSearch == true) {
      await RemoveStars(req.body.name.toLowerCase());
      return res.status(202).send({ message: 'Removed from favorites' });
    } else {
      await AddStars(req.body.name.toLowerCase());
      res.status(201).send({ message: 'Added to favorites' });
    }
  } catch {
    res.status(500).send({ message: 'Error' });
  }
});

app.get('/star/star', async (req: Request, res: Response) => {
  try {
    return res.status(201).json(await getAllStars().catch(console.error));
  } catch {
    return res.status(400).send({ message: 'Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
