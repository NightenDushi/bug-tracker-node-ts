import { DataContainer } from '../@types/DataContainer'
import { ITags } from '../@types/tag'
import pool from '../pool'

async function get(id:number):Promise<ITags>{
    const result = await pool.query('SELECT * FROM tags WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll(pGroupId:number):Promise<ITags[]>{
    const result = await pool.query('SELECT * FROM tags WHERE project_id = $1', [pGroupId])
    return result.rows
}

async function set(id:number, value:ITags):Promise<ITags>{
    await pool.query(`UPDATE tags SET (text, color) = ($1, $2) WHERE id = $3`,
                    [value.text, value.color, id]);
    return get(id)
}
async function Add(value:ITags):Promise<ITags>{
    await pool.query(`INSERT INTO tags (text, color) VALUES ($1, $2)`, [value.text, value.color]);
    const result = await pool.query('SELECT * FROM tags ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number, pGroupId:number):Promise<ITags[]>{
    await pool.query('DELETE FROM tags WHERE id = $1', [id]);
    return getAll(pGroupId)
}

const DBData:DataContainer<ITags> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;