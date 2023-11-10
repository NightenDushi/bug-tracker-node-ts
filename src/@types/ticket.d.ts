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
    dueDate?:Date,
    comments:CommentType[];
}