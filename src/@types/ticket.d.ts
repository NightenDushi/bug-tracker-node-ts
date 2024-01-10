import { ITags } from './tag'
import { CommentType } from './comment'
export type TicketType = {
    id:number,
    isDone:boolean,
    isDraft:boolean,
    urgency:number,
    title:string,
    body:string,
    tags:ITags[],
    person_assigned:number[],
    dueDate?:string, //We keep this value as a string to simplify convertion to js object
    comments_number:number,
    project_id:number
}