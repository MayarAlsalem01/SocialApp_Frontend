import { MouseEventHandler, ReactNode } from "react";

interface Props{
    type:"button"|"submit"|"reset";
    children:ReactNode,
    onClick?:MouseEventHandler<HTMLButtonElement>
    disabled?:boolean;
    className?:string
}
const Button=(props:Props)=>{
    return(
        <button  onClick={props.onClick} type={props.type} disabled={props.disabled} className={`"flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-700 hover:bg-indigo-600 rounded py-2 px-4 w-full transition duration-150 disabled:opacity-65 ease-in" ${props.className}`}>{props.children}</button>
    );

}
export default Button;