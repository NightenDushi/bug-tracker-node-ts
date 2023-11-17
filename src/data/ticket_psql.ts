import { DataContainer } from '../@types/DataContainer'
import { TicketType } from '../@types/ticket'
import pool from '../pool'

async function get(id:number):Promise<TicketType>{
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll():Promise<TicketType[]>{
    const result = await pool.query('SELECT * FROM tickets', [])
    return result.rows
}

async function set(id:number, value:TicketType):Promise<TicketType>{
    await pool.query(`UPDATE tickets
                    SET ("isDone", "isDraft", "urgency", "title", "body", "tags", "person_assigned", "dueDate", "comments") 
                    = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $10`,
                    [value.isDone, value.isDraft, value.urgency, value.title, value.body,
                        value.tags, value.person_assigned, value.dueDate, value.comments, id]);
    return get(id)
}
async function Add(value:TicketType):Promise<TicketType>{
    await pool.query(`INSERT INTO tickets ("isDone", "isDraft", "urgency", "title", "body",
                                            "tags", "person_assigned", "dueDate", "comments") 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                    [value.isDone, value.isDraft, value.urgency, value.title, value.body,
                        value.tags, value.person_assigned, value.dueDate, value.comments]);
    const result = await pool.query('SELECT * FROM tickets ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number):Promise<TicketType[]>{
    await pool.query('DELETE FROM tickets WHERE id = $1', [id]);
    return getAll()
}

const DBData:DataContainer<TicketType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default DBData;