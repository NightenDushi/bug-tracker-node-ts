//Data container interface
export type DataContainer<T> = {
    get:(id:number)=>T,
    getAll:()=>T[],
    set:(id:number, value:T)=>T,
    Add:(value:T)=>T,
    Delete:(id:number)=>T[],
}