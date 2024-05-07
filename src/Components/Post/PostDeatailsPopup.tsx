import { FormEvent, FormEventHandler, ReactEventHandler, useContext, useEffect, useState } from "react";
import { Post } from "../../types/Post";
import PostLayOut from "./PostLayOut";
import { useFetch } from "../../hooks/useFetch";
import { END_POINTS } from "../../constants/Api/endpoints";
import { Pagination } from "../../types/Pagination";
import { Comment } from "../../types/Comment";
import Button from "../ui/Button";
import { usePost } from "../../hooks/usePost";
import CommentComponent from "../CommentComponent";

interface Props {
    isVisible: boolean;
    Close: () => void;
    post: Post
}

const PostDeatailsPopup = (props: Props) => {
    const { data, loading, Fetch } = useFetch<Pagination<Comment>>();
    const { post, postError,postLoading } = usePost();
    useEffect(() => {

        Fetch(END_POINTS.CommentPag, { params: { postId: props.post.id, page: 1, pageSize: 5 } })
        console.log("details ")
        if(postError){
            alert('faild to write a comment ')
        }
    }, [postError]);
    
    const [comment, setComment] = useState('');

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(END_POINTS.CreateComment, { postId: props.post.id, commentText: comment} );
        
    }
    return (
        <>
            {props.isVisible ? <div className="fixed h-screen w-full flex flex-col justify-center items-center px-2 lg:px-0 left-0 top-0 z-20     " style={{ backgroundColor: "rgb(9 9 11 / 70%)" }}>
                <p onClick={props.Close} className="cursor-pointer">Close </p>
                <div className="w-full lg:w-1/2 h-4/5 md:h-4/5 pb-3 relative z-30 overflow-hidden rounded-md bg-zinc-900 ">
                    <header className=" flex justify-center py-3 font-bold text-xl text-zinc-300">
                        {props.post.user.userName} post
                    </header>
                    <main className="h-2/3 overflow-y-scroll">
                        <PostLayOut post={props.post} />
                        <hr className="w-11/12 m-auto opacity-40" />
                        <div id="comments" className="flex flex-col gap-2 p-3">{data?.response.data.map(comment => (
                            <CommentComponent key={comment.id} comment={comment} />
                        ))}
                        </div>
                    </main>
                    <footer className=" h-full flex p-3 gap-1">
                        <img src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" className="w-8 h-8 bg-green-400" style={{ borderRadius: "50%" }} />
                        <div className=" flex-1 h-fit  border rounded-lg  border-zinc-600 ">
                            <form onSubmit={onSubmitHandler}>
                                <textarea rows={3} onChange={(e) => { setComment(e.target.value);console.log(comment) }} className="h-fit w-full  p-2 pb-1 bg-transparent outline-none resize-none" placeholder="write a comment ..."></textarea>
                                <Button type="submit" disabled={false}>comment</Button>
                            </form>
                        </div>
                    </footer>
                </div>
            </div> : <></>}
        </>
    )
}
export default PostDeatailsPopup;