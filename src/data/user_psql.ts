import { DataContainer } from '../@types/DataContainer'
import { UserType } from '../@types/user'
import pool from '../pool'

async function get(id:number, github:boolean = false):Promise<UserType>{
    if (github){
        const result = await pool.query('SELECT * FROM users WHERE github_id = $1', [id]);
        return result.rows[0];
    }
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll():Promise<UserType[]>{
    const result = await pool.query('SELECT * FROM users ORDER BY id', [])
    return result.rows
}
//NOTE(Nathan) For now we set the whole object at once.
//  We need to find a good convention to only have to pass the modified element
async function set(id:number, value:UserType):Promise<UserType>{
    await pool.query('UPDATE users SET ("name", "image", "isAdmin") = ($1, $2, $3) WHERE id = $4', [value.name, value.image, value.isAdmin, id]);
    return get(id)
}
async function Add(value:UserType):Promise<UserType>{
    await pool.query('INSERT INTO users ("name", "image", "isAdmin", "github_id") VALUES ($1, $2, $3, $4)', [value.name, value.image, value.isAdmin, value.github_id]);
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