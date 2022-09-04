import { MongoClient, Collection, ServerApiVersion } from 'mongodb';
import { readFileSync } from 'fs';

let data = JSON.parse(readFileSync('./pokemonData.json', 'utf-8'));
// ?WARRNING: Nitzan's mongoDb address is used here and not Itay's.
const uri =
  'mongodb+srv://nitzanpap:ilovecode@cluster0.nercoqf.mongodb.net/?retryWrites=true&w=majority';

const amountOfOriginalPokemons = data.length;
let fusionIterator = amountOfOriginalPokemons + 1;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

run();

async function run() {
  let arr = [];

  addOriginalPokemonsToArray(arr);
  addAllFusionsToArray(arr);
  await addArrayToDb(arr);
}

function addOriginalPokemonsToArray(arr) {
  arr.push(...data);
}

function addAllFusionsToArray(arr) {
  for (let i = 0; i < amountOfOriginalPokemons; i++) {
    for (let j = 0; j < amountOfOriginalPokemons; j++) {
      if (i !== j) {
        arr.push(combinePokemons(arr[i], arr[j], fusionIterator++));
      }
    }
  }
}

function combinePokemons(pok1, pok2, id) {
  return {
    name: pok1.name + '/' + pok2.name,
    rawData: null,
    id: id,
    height: Math.floor((pok1.height + pok2.height) / 2).toString(),
    weight: Math.floor((pok1.weight + pok2.weight) / 2).toString(),
    isFavorite: false,
    moves: [
      ...pok1.moves.slice(0, Math.floor(pok1.moves.length / 2)),
      ...pok2.moves.slice(Math.floor(pok2.moves.length / 2)),
    ],
    visualId: id.toString(),
    pictureSrc: [
      `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${pok1.id}.${pok2.id}.png`,
      `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${pok1.id}/${pok1.id}.${pok2.id}.png`,
    ],
    pokemonTypes: [pok1.pokemonTypes[0], pok2.pokemonTypes[0]],
    spritesSources: {},
  };
}

async function addArrayToDb(arr) {
  try {
    await client.connect();
    // Declare db and its collection
    let pokedex = client.db('pokedex');
    let pokemons = pokedex.collection('pokemons');
    // Clear any previous data in the collection and redeclare the collection
    pokemons.drop();
    pokemons = pokedex.collection('pokemons');

    // Insert all pokemons, originals and fusions, into the db.
    await pokemons.insertMany(arr, {
      maxTimeMS: 99999,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
