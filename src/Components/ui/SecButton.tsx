import { MouseEventHandler, ReactNode } from "react";

interface Props{
    children:ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className?:string
}
const SecButton =(props:Props)=>{
    return(
        <>
            <button type="button" onClick={props.onClick} className={` flex-1 px-1 py-2 rounded-md font-semibold opacity-70 hover:bg-zinc-700  transition duration-150 ease-in ${props.className}`}>{props.children}</button>
        </>
    );
}
export default SecButton;