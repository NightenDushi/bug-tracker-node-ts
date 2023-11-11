import { DataContainer } from '../@types/DataContainer'
import { UserType } from '../@types/user'
import pool from '../pool'

//Pseudo Data container for testing

async function get(id:number):Promise<UserType>{
    console.log("Query:"+id)
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    console.log(result)
    return result.rows[0];
}
async function getAll():Promise<UserType[]>{
    const result = await pool.query('SELECT * FROM users', [])
    console.log(result.rows)
    return result.rows
}
//NOTE(Nathan) For now we set the whole object at once.
//  We need to find a good convention to only have to pass the modified element
function set(id:number, value:UserType):UserType{
    
    return
}
function Add(value:UserType):UserType{
    
    return
}
function Delete(id:number):UserType[]{
    
    return
}

const DBData:DataContainer<UserType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;