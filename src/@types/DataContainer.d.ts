//Data container interface
export type DataContainer<T> = {
    get:(id:number)=>(T|Promise<T>),
    getAll:()=>(T[]|Promise<T[]>),
    set:(id:number, value:T)=>(T|Promise<T>),
    Add:(value:T)=>(T|Promise<T>),
    Delete:(id:number)=>(T[]|Promise<T[]>),
}