const { MongoClient, Collection, ServerApiVersion } = require('mongodb');
const fs = require('fs');

let data = fs.readFileSync('./pokemonData.json', 'utf-8');
const uri =
  'mongodb+srv://nitzanpap:ilovecode@cluster0.nercoqf.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

run();

async function run() {
  let arr = [];
  let counter = 906;

  addOriginalToArray(arr);
  addAllFusionsToArray(arr, counter);
  await addArrayToDb(arr);
}

function addOriginalToArray(arr) {
  data = JSON.parse(data);
  arr.push(...data);
}

function addAllFusionsToArray(arr, counter) {
  for (let i = 0; i < 905; i++) {
    for (let j = 0; j < 905; j++) {
      if (i !== j) {
        arr.push(combinePokemons(arr[i], arr[j], counter++));
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
