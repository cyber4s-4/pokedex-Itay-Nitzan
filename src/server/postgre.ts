import { query } from "express";

const { Pool } = require("pg");
const pool = new Pool(
    {
        connectionString:
            process.env.DATABASE_URL ||
            "postgres://seeufvlotoovup:087dbde9ea597d7238c09f710706e7eccd564b32096a816ecfce1aefa7e70dac@ec2-34-247-72-29.eu-west-1.compute.amazonaws.com:5432/ddmh88c9kajff6",
        ssl: {
            rejectUnauthorized: false,
        },
    },
    (err: Error) => {
        if (err) {
            console.log("Could not connect to database", err.message);
        } else {
            console.log("Connected to database");
        }
    }
);
connect();

async function connect() {
    try {
        await pool.connect();
        console.log("Connected to database");
    } catch (error) {
        console.log("Could not connect to database");
    }
}




export async function get20Pokemons(from = 0, limit = 20) {

    const query = {
        text: 'SELECT * FROM pokemons order by id limit $1 offset $2',
        values: [limit, from]
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        console.log('done loading 20 pokemons');
    }
}

export async function getPokemonSearch(pokemon: string | number) {
    let query;
    if (typeof pokemon === 'string') {
        query = {
            text: 'SELECT * FROM pokemons WHERE name = $1',
            values: [pokemon]
        }
    } else {
        query = {
            text: 'SELECT * FROM pokemons WHERE id = $1',
            values: [pokemon]
        }
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows[0]);
    } catch (e) {
        console.error(e);
    } finally {
        console.log('done pokemon search');
    }
}

export async function getAllStars() {
    const query = {
        text: `SELECT * FROM pokemons WHERE "isFavorite" = true`,
        values: []
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        console.log('done loading stars');
    }
}

// !TODO: Remove plural 's' from the function name.
export async function RemoveStars(name: string) {
    const query = {
        text: 'UPDATE pokemons SET "isFavorite" = false WHERE name = $1',
        values: [name]
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        console.log('done removing star');
    }
}

// !TODO: Remove plural 's' from the function name.
export async function AddStars(pokemon: string) {
    const query = {
        text: 'UPDATE pokemons SET "isFavorite" = true WHERE name = $1',
        values: [pokemon]
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        console.log('done adding star');
    }
}

export async function SearchStars(pokemon: string) {
    const query = {
        text: 'SELECT name FROM pokemons WHERE name = $1',
        values: [pokemon]
    }
    try {
        const pokemonFromDB = await pool.query(query.text, query.values).then((res: any) => res.rows);
        return pokemonFromDB.isFavorite == true;
    } catch (e) {
        console.error(e);
    }
}

export async function get20Sorted(from: number = 0, limit: number = 20, sortBy: 'name' | 'id', dir: 1 | -1) {
    const query = {
        text: `SELECT * FROM pokemons LIMIT $1 OFFSET $2 ORDER BY ${sortBy} ${dir == 1 ? 'ASC' : 'DESC'}`,
        values: [limit, from]
    }
    try {
        return await pool.query(query.text, query.values).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        console.log("done loading 20 pokemons");
    }
}
