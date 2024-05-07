import React from "react";

interface Props{
    id:string,
    type:'password'|'text'|'email',
    name:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    placeholder:string
    className?:string;
    value?:string;
    defaultValue?:string;
}
const Input=(props:Props)=>{
    return(
        <input id={props.id} type={props.type} defaultValue={props.defaultValue} value={props.value} name={props.name} onChange={props.onChange} className={`text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border bg-zinc-700 text-white  border-zinc-800 w-full py-2 focus:outline-none focus:border-zinc-400 ${props.className}`}  placeholder={props.placeholder} />

    )
}
export default Input;