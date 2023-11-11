//Data container interface
export type DataContainer<T> = {
    get:(id:number)=>(T|Promise<T>),
    getAll:()=>(T[]|Promise<T[]>),
    set:(id:number, value:T)=>T,
    Add:(value:T)=>T,
    Delete:(id:number)=>T[],
}