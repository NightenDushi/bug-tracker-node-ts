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
async function getAll(pGroupId:number):Promise<UserType[]>{
    //TODO(Nathan) We need to do an union with the project_members table
    const result = await pool.query(`SELECT * from users WHERE id
        IN (SELECT id_user FROM project_members WHERE id_project = 1 
            UNION SELECT owner_id FROM projects WHERE id = 1);`, [])
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
//TODO(Nathan) Differentiate Delete from project and delete from the whole app. We want the former in most cases
async function Delete(id:number, pGroupId:number):Promise<UserType[]>{
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return getAll(pGroupId)
}

const DBData:DataContainer<UserType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;