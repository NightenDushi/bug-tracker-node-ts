import { DataContainer } from '../@types/DataContainer'
import { UserType } from '../@types/user'
import pool from '../pool'

//Pseudo Data container for testing

async function get(id:number):Promise<UserType>{
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll():Promise<UserType[]>{
    const result = await pool.query('SELECT * FROM users', [])
    return result.rows
}
//NOTE(Nathan) For now we set the whole object at once.
//  We need to find a good convention to only have to pass the modified element
async function set(id:number, value:UserType):Promise<UserType>{
    await pool.query('UPDATE users SET (name, image, isadmin) = ($1, $2, $3) WHERE id = $4', [value.name, value.image, value.isAdmin, id]);
    return get(id)
}
async function Add(value:UserType):Promise<UserType>{
    await pool.query('INSERT INTO users (name, image, isadmin) VALUES ($1, $2, $3)', [value.name, value.image, value.isAdmin]);
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number):Promise<UserType[]>{
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return getAll()
}

const DBData:DataContainer<UserType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;