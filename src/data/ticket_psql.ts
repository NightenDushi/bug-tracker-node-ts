import { DataContainer } from '../@types/DataContainer'
import { TicketType } from '../@types/ticket'
import pool from '../pool'

async function get(id:number):Promise<TicketType>{
    const result = await pool.query(`
    SELECT *,
    (SELECT COUNT(*) from comments WHERE "ticketId" = $1)::integer AS comments_number 
    FROM tickets WHERE id = $1`, [id]);
    return result.rows[0];
}
async function getAll():Promise<TicketType[]>{
    const result = await pool.query(`
    SELECT T.*,
    (SELECT COUNT(*) from comments WHERE "ticketId" = T.id)::integer AS comments_number
    FROM tickets T`, [])
    return result.rows
}

async function set(id:number, value:TicketType):Promise<TicketType>{
    await pool.query(`UPDATE tickets
                    SET ("isDone", "isDraft", "urgency", "title", "body", "tags", "person_assigned", "dueDate") 
                    = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id = $9`,
                    [value.isDone, value.isDraft, value.urgency, value.title, value.body,
                        value.tags, value.person_assigned, value.dueDate, id]);
    return get(id)
}
async function Add(value:TicketType):Promise<TicketType>{
    await pool.query(`INSERT INTO tickets ("isDone", "isDraft", "urgency", "title", "body",
                                            "tags", "person_assigned", "dueDate") 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [value.isDone, value.isDraft, value.urgency, value.title, value.body,
                        value.tags, value.person_assigned, value.dueDate]);
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