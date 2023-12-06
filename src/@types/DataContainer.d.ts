//Data container interface
export type DataContainer<T> = {
    get:(id:number, github?:boolean)=>(T|Promise<T>),
    getAll:(pGroupId?:number)=>(T[]|Promise<T[]>),
    set:(id:number, value:T)=>(T|Promise<T>),
    Add:(value:T)=>(T|Promise<T>),
    Delete:(id:number, pGroupId?:number)=>(T[]|Promise<T[]>),
}