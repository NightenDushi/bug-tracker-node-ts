import {DataContainer} from '../@types/DataContainer'
import {TicketType} from '../@types/ticket'

//Pseudo Data container for testing
let tickets:TicketType[] = []
let id_increment:number = 0

function get(id:number):TicketType{
    const RequestedTicket = tickets.find((t)=>t.id==id);
    if (RequestedTicket!==undefined) return RequestedTicket        
    return {id:-1, isDone:false, isDraft:false, urgency:-1, 
        title:"", body:"", tags:[], person_assigned:[],comments:[]} //False info
}
function getAll():TicketType[]{
    return tickets
}
//NOTE(Nathan) For now we set the whole object at once.
//  We need to find a good convention to only have to pass the modified element
function set(id:number, value:TicketType):TicketType{
    const RequestedTicketIndex = tickets.findIndex((u)=>u.id==id);
    tickets[RequestedTicketIndex] = value;

    return tickets[RequestedTicketIndex]
}
function Add(value:TicketType):TicketType{
    value.id = id_increment;
    id_increment += 1;
    tickets.push(value);
    return value;
}
function Delete(id:number):TicketType[]{
    const RequestedTicketIndex = tickets.findIndex((u)=>u.id==id);
    tickets = tickets.slice(RequestedTicketIndex,1);
    return tickets
}

const MemoryData:DataContainer<TicketType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default MemoryData;