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