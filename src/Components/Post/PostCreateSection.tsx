import Input from "../ui/InputText"
import image from '../../assest/logo.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/Auth/AuthContext";
import PostCreatePopup from "./PostCreatePopup";
const PostCreateSection = () => {
    const [isActive,setActive]=useState(false);
    const user = useContext(AuthContext);
    return (
        <>
            <PostCreatePopup isActive={isActive} toggleActive={()=>{setActive(false)}} />
            <div className="bg-zinc-900 rounded-md flex flex-col items-start gap-2 p-9">
                <div className="w-full flex  items-center gap-2 ">
                    <div >
                        <img src={user?.authModel?.imageUrl? user.authModel.imageUrl:`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} className="w-10 h-10 object-cover rounded-full" alt="" />
                    </div>
                    <div className="flex-1 cursor-pointer">
                        <p onClick={()=>{setActive(true)}} className="cursor-pointer border border-zinc-700 rounded opacity-85 p-2 pl-3" >{`what's on your mind ${user?.authModel?.userName.toLowerCase()}...`}</p>

                    </div>
                </div>

            </div>

        </>)
}
export default PostCreateSection;