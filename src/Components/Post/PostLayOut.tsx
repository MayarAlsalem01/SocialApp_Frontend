import { ReactEventHandler, ReactNode, useState } from "react";
import SecButton from "../ui/SecButton";
import { Post  } from "../../types/Post";
import PostDeatailsPopup from "./PostDeatailsPopup";


{/* <p style={{background:'red',width:'50px',height:'50px',borderRadius:'50%'}}></p> */ }
interface Props{
    
    
    post:Post
}
const PostLayOut = (props:Props) => {
    const calculateTimeDifference = (createdAt: string): string => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
      
        // Get the time zone offset in minutes
        const timeZoneOffset = currentDate.getTimezoneOffset();
      
        // Adjust current date to UTC by adding the time zone offset
        currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
      
        const differenceInSeconds = Math.floor((currentDate.getTime() - createdDate.getTime()) / 1000);
      
        const seconds = differenceInSeconds % 60;
        const minutes = Math.floor(differenceInSeconds / 60) % 60;
        const hours = Math.floor(differenceInSeconds / 3600) % 24;
        const days = Math.floor(differenceInSeconds / (3600 * 24));
      
        if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
      };
      
      
    const [visible,setVisible]=useState(false)
    const postImage = props.post.postImage  ?`data:image/jpeg;base64,${props.post.postImage}`:null;
   
    return (
        <div className="w-full">
            <PostDeatailsPopup post={props.post} isVisible={visible} Close={()=>{setVisible(false)}} />
            <div id={props.post.id}>
                <div className="card  bg-zinc-900 rounded-2xl   ">
                    <header className="p-3 pt-5">
                        <div className="flex gap-1">
                            <img src={props.post.user.imageUrl?props.post.user.imageUrl:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="object-cover" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
                            <div>
                                <p className=" h-fit font-semibold">{props.post.user.userName}</p>
                                <p className=" h-fit text-sm font-extralight opacity-50">{calculateTimeDifference(props.post.createAt)}</p>
                            </div>
                        </div>
                    </header>
                    <main className="mt-1 min-w-full break-words">
                        <p className="p-3 ">{props.post.content}</p>
                        {!postImage ? null:<img className=" w-full" src={postImage} />}
                        
                    </main>
                    <footer>
                        <div className="p-3 flex justify-between items-center">
                                <p className="text-sm font-extralight opacity-50">Likes 0</p>
                                <p className="text-sm font-extralight opacity-50">comments:{props.post.commentsNumber}</p>
                            </div>
                            <hr className="w-11/12 m-auto opacity-40" />
                            <div className="flex items-center p-3">
                                <SecButton >Like</SecButton>
                                <SecButton onClick={()=>setVisible(!visible)}>Comment</SecButton>
                            </div>
                    </footer>
                </div>
            </div>
        </div>
    );
    
}


export default PostLayOut;