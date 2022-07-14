const { MongoClient, Collection } = require("mongodb");

const fs = require("fs");

let data = fs.readFileSync("./pokemonData.json", "utf-8");

const uri =
  "mongodb+srv://itay234:abc12345@cluster0.one6i.mongodb.net/?retryWrites=true&w=majority";
// const local = "mongodb://localhost:27017/?authMechanism=DEFAULT";

const client = new MongoClient(uri);
// Collection.prototype.findById = function (id) {
//   return this.findOne({ id });
// };

async function run() {
  let pokedex = client.db("pokedex");
  let pokemons = pokedex.collection("pokemons");
  data = JSON.parse(data);
  let arr = data.map((x) => {
    x.pictureSrc = [x.pictureSrc];
    return x;
  });
  let counter = 906;
  addAllFusionsToDb(arr, counter);
  // console.log(counter)
  // arr.splice(0, arr.length - 3025);

  // if (false)
  while (arr.length) {
    // console.log(arr.length);
    // await pokemons.insertMany(arr.splice(0, 3025), {
    //   maxTimeMS: 99999,
    // });
    // if (false)
    await Promise.all([
      pokemons.insertMany(arr.splice(0, 2000), {
        maxTimeMS: 99999,
      }),
      pokemons.insertMany(arr.splice(0, 2000), {
        maxTimeMS: 99999,
      }),
      pokemons.insertMany(arr.splice(0, 2000), {
        maxTimeMS: 99999,
      }),
      pokemons.insertMany(arr.splice(0, 2000), {
        maxTimeMS: 99999,
      }),
    ]);
    // await pokemons.insertMany(arr.splice(0, 2000), {
    //   maxTimeMS: 99999,
    // });
  }
}

function addAllFusionsToDb(arr, counter) {
  for (let i = 0; i < 905; i++) {
    for (let j = 0; j < 905; j++) {
      if (i !== j) arr.push(combinePokemons(arr[i], arr[j], counter++));
    }
  }
}

function combinePokemons(pok1, pok2, id) {
  // let random = Math.floor(Math.random() * 2);
  // console.log(pok1);
  let pokemon = {
    name: pok1.name + "/" + pok2.name,
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
  return pokemon;
}

run().then(() => client.close());
