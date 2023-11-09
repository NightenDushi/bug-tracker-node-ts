import {DataContainer} from '../@types/DataContainer'
import {UserType} from '../@types/user'

//Pseudo Data container for testing
let users:UserType[] = [
    {id:0, name:"Nathan", image:"foo.jpg", isAdmin:true},
    {id:1, name:"Tim", image:"foo.jpg", isAdmin:false},
    {id:2, name:"Oliwia", image:"foo.jpg", isAdmin:false},
]

function get(id:number):UserType{
    const RequestedUser = users.find((u)=>u.id==id);
    if (RequestedUser!==undefined) return RequestedUser
    return {id:-1, name:"", image:"", isAdmin:false} //False info
}
function getAll():UserType[]{
    return users
}
function set(id:number, value:UserType):UserType{
    return
}
function Add(id:number, value:UserType):UserType{
    return
}
function Delete(id:number):boolean{
    
    return false
}

const MemoryData:DataContainer<UserType> = {
    get:get,
    getAll:getAll,
    set:set,
    Add:Add,
    Delete:Delete,
}
export default MemoryData;