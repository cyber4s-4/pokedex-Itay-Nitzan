import { json } from 'body-parser';
import { MongoClient, Db, Collection } from 'mongodb';
import { Pokemon } from 'src/client/Pokemon';

export const uri =
  'mongodb+srv://itay234:abc12345@cluster0.one6i.mongodb.net/?retryWrites=true&w=majority';
export const client = new MongoClient(uri);

export async function create() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    console.log('connected to DB');
  }
}

create();

export async function getCollection(
  dbName: string,
  collectionName: string
): Promise<Collection<Pokemon>> {
  const db: Db = client.db(dbName);
  const collection: Collection<Pokemon> = db.collection(collectionName);
  return collection;
}

export async function get20Pokemons(from = 0, limit = 20) {
  try {
    const pokemons = await getCollection('pokedex', 'pokemons');
    return await pokemons.find({}).skip(from).limit(limit).toArray();
  } catch (e) {
    console.error(e);
  } finally {
    console.log('done loading 20 pokemons');
  }
}

export async function getPokemonSearch(pokemon: string | number) {
  if (typeof pokemon === 'string') {
    try {
      const collectionName = await getCollection('pokedex', 'pokemons');
      return await collectionName.findOne({ name: pokemon });
    } catch (e) {
      console.error(e);
    } finally {
      console.log('done pokemon search');
    }
  } else {
    try {
      const collectionName = await getCollection('pokedex', 'pokemons');
      return await collectionName.findOne({ id: pokemon });
    } catch (e) {
      console.error(e);
    } finally {
      console.log('done pokemon search');
    }
  }
}

export async function getAllStars() {
  try {
    const collectionName = await getCollection('pokedex', 'pokemons');
    return await collectionName.find({ isFavorite: true }).toArray();
  } catch (e) {
    console.error(e);
  } finally {
    console.log('done loading stars');
  }
}

export async function RemoveStars(pokemon: string) {
  try {
    const collectionName = await getCollection('pokedex', 'pokemons');
    return await collectionName.updateOne({ name: pokemon }, { $set: { isFavorite: false } });
  } catch (e) {
    console.error(e);
  } finally {
    console.log('done removing star');
  }
}

export async function AddStars(pokemon: string) {
  try {
    const collectionName = await getCollection('pokedex', 'pokemons');
    return await collectionName.updateOne({ name: pokemon }, { $set: { isFavorite: true } });
  } catch (e) {
    console.error(e);
  } finally {
    console.log('done adding star');
  }
}

export async function SearchStars(pokemon: string) {
  try {
    const collectionName = await getCollection('pokedex', 'pokemons');
    const find = await collectionName.findOne({ name: pokemon });
    return find?.isFavorite == true;
  } catch (e) {
    console.error(e);
  }
}

export async function get20Sorted(from = 0, limit = 20, sortBy: 'name' | 'id', dir: 1 | -1) {
  try {
    const pokemons = await getCollection('pokedex', 'pokemons');
    const response = await pokemons.find({}).sort(sortBy, dir).skip(from).limit(limit).toArray();
    return response;
  } catch (e) {
    console.error(e);
  } finally {
    console.log('done loading 20 pokemons');
  }
}
