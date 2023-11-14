import { DataContainer } from '../@types/DataContainer'
import { ITags } from '../@types/tag'
import pool from '../pool'

async function get(id:number):Promise<ITags>{
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll():Promise<ITags[]>{
    const result = await pool.query('SELECT * FROM tickets', [])
    return result.rows
}

async function set(id:number, value:ITags):Promise<ITags>{
    await pool.query(`UPDATE tickets SET (text, color) = ($1, $2) WHERE id = $3`,
                    [value.text, value.color, id]);
    return get(id)
}
async function Add(value:ITags):Promise<ITags>{
    await pool.query(`INSERT INTO tickets (text, color) VALUES ($1, $2)`, [value.text, value.color]);
    const result = await pool.query('SELECT * FROM tickets ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number):Promise<ITags[]>{
    await pool.query('DELETE FROM tickets WHERE id = $1', [id]);
    return getAll()
}

const DBData:DataContainer<ITags> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;