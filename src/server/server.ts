const express = require('express');
const path = require('path');
const cors = require('cors');
import {
  getPokemonSearch,
  getAllStars,
  RemoveStars,
  AddStars,
  SearchStars,
  get20Pokemons,
  get20Sorted
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

app.get('/pokemons', async (req: Request, res: Response) => {
  try {
    let offset = Number(req.query.offset) || 0;
    let limit = 20;
    let sort = req.query.sort;
    if (sort) {
      if (sort === "A2Z") {
        res.status(201).json(await get20Sorted(offset, limit, 'name', 1));
      } else if (sort === "Z2A") {
        res.status(201).json(await get20Sorted(offset, limit, 'name', -1));
      }
      else if (sort === "h2l") {
        res.status(201).json(await get20Sorted(offset, limit, 'id', -1));
      }
      else if (sort === "l2h") {
        res.status(201).json(await get20Sorted(offset, limit, 'id', 1));
      }
    }
    else {
      let response = await get20Pokemons(offset, limit);
      res.status(201).json(response);
    }
  } catch {
    res.status(400).send({ message: 'Error' });
  }
});

app.get('/:searchValue', async (req: Request, res: Response) => {
  // If request contains a number
  if (!isNaN(Number(req.params.searchValue))) {
    try {
      const pokemonID = Number(req.params.searchValue);
      const dataPokemon = await getPokemonSearch(pokemonID);
      if (!dataPokemon) {
        res.status(400).send({ message: 'Pokemon not found' });
      } else {
        res.status(201).json(dataPokemon);
      }
    } catch {
      res.status(400).send({ message: 'Error' });
    }
    // If request contains a string
  } else {
    try {
      const pokemonName = req.params.searchValue.toLowerCase();
      const dataPokemon = await getPokemonSearch(pokemonName);
      if (!dataPokemon) {
        res.status(400).send({ message: 'Pokemon not found' });
      } else {
        res.status(201).json(dataPokemon);
      }
    } catch {
      res.status(400).send({ message: 'Error' });
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
    res.status(201).json(await getAllStars());
  } catch {
    res.status(400).send({ message: 'Error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
