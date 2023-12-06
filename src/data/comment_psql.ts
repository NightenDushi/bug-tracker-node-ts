import { DataContainer } from '../@types/DataContainer'
import { CommentType } from '../@types/comment'
import pool from '../pool'

async function get(id:number):Promise<CommentType>{
    const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0];
}
async function getAll(pTicketId:number):Promise<CommentType[]>{
    if (pTicketId==-1){ //default value if no id provided, get all tickets existing
        const result = await pool.query('SELECT * FROM comments', [])
        return result.rows
    }

    const result = await pool.query(`SELECT * FROM comments WHERE "ticketId" = $1 ORDER BY date`, [pTicketId])
    return result.rows
}

async function set(id:number, value:CommentType):Promise<CommentType>{
    await pool.query(`UPDATE comments SET (body, date, likes) = ($1, $2, $3) WHERE id = $4`,
                    [value.body, value.date, value.likes, id]);
    return get(id)
}
async function Add(value:CommentType):Promise<CommentType>{
    await pool.query(`INSERT INTO comments ("ticketId", "senderId", body, date) VALUES ($1, $2, $3, $4)`,
                    [value.ticketId, value.senderId, value.body, value.date]);
    const result = await pool.query('SELECT * FROM comments ORDER BY id DESC LIMIT 1');
    return result.rows[0]
}
async function Delete(id:number, pTicketId:number):Promise<CommentType[]>{
    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    return getAll(pTicketId)
}

export async function Like(id:number, pUserId:number):Promise<CommentType>{
    if (pUserId !== undefined){
        const UpdatedValues = await pool.query('UPDATE comments SET likes = ARRAY_APPEND(likes, $1) WHERE id = $2 AND NOT $1=ANY(likes)', [pUserId, id]);
        if (UpdatedValues.rowCount==0){
            await pool.query('UPDATE comments SET likes = ARRAY_REMOVE(likes, $1) WHERE id = $2 AND $1=ANY(likes)', [pUserId, id])
        }
    }
    return get(id);
}

export const DBData:DataContainer<CommentType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}