import {DataContainer} from '../@types/DataContainer'
import {UserType} from '../@types/user'

//Pseudo Data container for testing
let users:UserType[] = [
    {id:0, name:"Nathan", image:"foo.jpg", isAdmin:true},
    {id:1, name:"Tim", image:"foo.jpg", isAdmin:false},
    {id:2, name:"Oliwia", image:"foo.jpg", isAdmin:false},
]
let id_increment:number = 3

function get(id:number):UserType{
    const RequestedUser = users.find((u)=>u.id==id);
    if (RequestedUser!==undefined) return RequestedUser
    return {id:-1, name:"", image:"", isAdmin:false} //False info
}
function getAll():UserType[]{
    return users
}
//NOTE(Nathan) For now we set the whole object at once.
//  We need to find a good convention to only have to pass the modified element
function set(id:number, value:UserType):UserType{
    const RequestedUserIndex = users.findIndex((u)=>u.id==id);
    users[RequestedUserIndex] = value;

    return users[RequestedUserIndex]
}
function Add(id:number, value:UserType):UserType{
    value.id = id_increment;
    id_increment += 1;
    users.push(value);
    return value;
}
function Delete(id:number):UserType[]{
    const RequestedUserIndex = users.findIndex((u)=>u.id==id);
    users = users.slice(RequestedUserIndex,1);
    return users
}

const MemoryData:DataContainer<UserType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default MemoryData;