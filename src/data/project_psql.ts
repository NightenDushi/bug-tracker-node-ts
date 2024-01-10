import { DataContainer } from '../@types/DataContainer'
import ProjectType from '../@types/project'
import pool from '../pool'

async function get(id:number):Promise<ProjectType>{
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll(pGroupId:number):Promise<ProjectType[]>{
    const result = await pool.query(`SELECT * from projects WHERE owner_id = $1 
                                OR $1 IN (SELECT id_user FROM project_members WHERE id_project = projects.id)`, [pGroupId])
    return result.rows
}

async function set(id:number, value:ProjectType):Promise<ProjectType>{
    await pool.query(`UPDATE tags SET (name, owner_id) = ($1, $2) WHERE id = $3`,
                    [value.name, value.owner_id, id]);
    return get(id)
}
async function Add(value:ProjectType):Promise<ProjectType>{
    await pool.query(`INSERT INTO tags (name, owner_id) VALUES ($1, $2)`, [value.name, value.owner_id]);
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number, pGroupId:number):Promise<ProjectType[]>{
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return getAll(pGroupId)
}

const DBData:DataContainer<ProjectType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;