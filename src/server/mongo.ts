import { MongoClient, Db, Collection } from 'mongodb';
import { Pokemon } from 'src/client/Pokemon';

export const uri =
    "mongodb+srv://itay234:abc12345@cluster0.one6i.mongodb.net/?retryWrites=true&w=majority";
export const client = new MongoClient(uri);

export async function create() {
    await client.connect();
}

export async function collection(dbName: string, collectionName: string): Promise<Collection<Pokemon>> {
    const db: Db = client.db(dbName);
    const collection: Collection<Pokemon> = db.collection(collectionName);
    return collection;
}

export async function getAllPokemons() {
    try {
        const connect = await create();
        const collectionName = await collection('pokedex', 'pokemons');
        return await collectionName.find({}).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done");
        client.close();
    }
}


export async function getPokemonSearch(pokemon: string | number) {
    if (typeof pokemon === "string") {
        try {
            const connect = await create();
            const collectionName = await collection('pokedex', 'pokemons');
            return await collectionName.findOne({ name: pokemon });
        } catch (e) {
            console.error(e);
        } finally {
            console.log("done");
            client.close();
        }
    } else {
        try {
            const connect = await create();
            const collectionName = await collection('pokedex', 'pokemons');
            return await collectionName.findOne({ id: pokemon });
        } catch (e) {
            console.error(e);
        } finally {
            console.log("done");
            client.close();
        }
    }
}


export async function getAllStars() {
    try {
        const connect = await create();
        const collectionName = await collection('pokedex', 'pokemons');
        return await collectionName.find({ isFavorite: true }).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done");
        client.close();
    }
}

export async function RemoveStars(pokemon: string) {
    try {
        const connect = await create();
        const collectionName = await collection('pokedex', 'pokemons');
        return await collectionName.updateOne({ name: pokemon },
            { $set: { isFavorite: false } });
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done");
        client.close();
    }
}

export async function AddStars(pokemon: string) {
    try {
        const connect = await create();
        const collectionName = await collection('pokedex', 'pokemons');
        return await collectionName.updateOne({ name: pokemon },
            { $set: { isFavorite: true } });
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done");
        client.close();
    }
}

export async function SearchStars(pokemon: string) {
    try {
        const connect = await create();
        const collectionName = await collection('pokedex', 'pokemons');
        const find = await collectionName.findOne({ name: pokemon });
        if (find?.isFavorite == true) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done");
        client.close();
    }
}