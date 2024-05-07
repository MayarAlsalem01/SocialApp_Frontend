import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assest/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigation = useNavigate();
    const [toggle, setToggle] = useState(false);
    return (
        <div className="bg-zinc-950 shadow-sm  shadow-zinc-900 p-3 pb-1 mb-4 sticky top-0 z-10 ">
            <div className="flex justify-between items-center mb-1  ">
                <div className="text-lg ">
                    <img src={logo} className="w-12" alt="" />
                </div>
                <div className="cursor-pointer md:hidden" >
                <ul className="flex items-center">
                    <li > <FontAwesomeIcon className="rounded-sm p-2 transition-all hover:bg-zinc-900 cursor-pointer" icon={faBell} size="lg" /></li>
                    <li onClick={() => { setToggle(!toggle) }}>Menu</li>
                </ul>
                </div>
                <div className="hidden md:block">
                    <ul className="flex gap-2 justify-end items-center ">
                        <li> <Link to='/' className="rounded-sm p-2 transition-all hover:bg-zinc-900"><FontAwesomeIcon size="lg" icon={faHouse} /></Link></li>
                        <li > <FontAwesomeIcon className="rounded-sm p-2 transition-all hover:bg-zinc-900 cursor-pointer" icon={faBell} size="lg" /></li>
                        <li><Link to='/profile' className="rounded-sm p-2 transition-all hover:bg-zinc-900 cursor-pointer"><FontAwesomeIcon icon={faUser} size="lg" /></Link></li>
                        <li><Link to='/login' onClick={() => { localStorage.clear(); }} className="rounded-sm p-2 transition-all hover:bg-zinc-900"><FontAwesomeIcon size="lg" icon={faRightFromBracket} /></Link></li>
                    </ul>
                </div>
            </div>
            {toggle ? <div className="bg-zinc-900 border border-x-0 border-b-0 border-zinc-900 md:hidden">
                <ul className="flex flex-col">
                    <li className=" border border-x-0 border-t-0 border-zinc-950 p-2"><FontAwesomeIcon size="lg" icon={faHouse} /></li>
                    <Link to='/login' onClick={() => { localStorage.clear() }} className=" border border-x-0 border-t-0 border-zinc-950 p-2"><FontAwesomeIcon size="lg" icon={faRightFromBracket} /></Link>
                </ul>
            </div> : <></>}
        </div>
    );
}
export default Navbar;