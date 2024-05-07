import { useContext, useEffect, useState } from "react"
import { Comment } from "../types/Comment"
import { AuthContext } from "../hooks/Auth/AuthContext"
import { useDelete } from "../hooks/useDelete"

interface Props {
    comment: Comment
}
const CommentComponent = (props: Props) => {
    const user = useContext(AuthContext);
    const {DeleteLoading,DeleteError,Delete}=useDelete();
    const [isVisible, setIsVisible] = useState(true); 
    useEffect(()=>{
        if(DeleteError){
            alert("cannot delete comment ")
        }
    },[DeleteError])
    const onClickHandler=()=>{
        const commentId=props.comment.id;
        console.log(commentId)
        Delete('https://localhost:7082/api/Comment/commentId/delete',{params:{commentId:commentId}})
    }
    if (!isVisible) {
        return null; // If not visible, return null to remove the component from the screen
    }
    return (
        
            <div  className="flex justify-start items-start gap-1 w-fit">
                <img src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" className="w-8 h-8 bg-green-400" style={{ borderRadius: "50%" }} />
                <div className="flex flex-col items-start p-2 pt-0 relative rounded-xl bg-zinc-700">
                    <div className="w-full flex justify-between items-center ">
                        <p className="opacity-60 h-fit p-0 w-fit">{props.comment.user.userName} </p>
                        {props.comment.user.email === user?.authModel?.email ? 
                        <i className="h-fit fa-solid fa-xmark text-red-600 p-1 cursor-pointer " onClick={onClickHandler}></i> : <></>}
                    </div>
                        
                    <p>{props.comment.commentText}</p>
                </div>
            </div>
      
    )
}
export default CommentComponent 