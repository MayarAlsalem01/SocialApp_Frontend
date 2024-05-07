import React, { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import Input from "../ui/InputText";
import Button from "../ui/Button";
import SecButton from "../ui/SecButton";
import { usePost } from "../../hooks/usePost";
import { END_POINTS } from "../../constants/Api/endpoints";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
interface Props {
    isActive: boolean;
    toggleActive: ()=>void
}

const PostCreatePopup = (props: Props) => {
    
    const {postData,postLoading,post,postError}=usePost();
    useEffect(()=>{
        if(!postLoading && postData!==undefined){
            props.toggleActive();
        }
        
    },[postLoading,postData])
    const [content,setContent]=useState('');
    const [postImage,setPostImage]=useState<File|undefined>(undefined);
    const HandleOnSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const bodyFromData =new FormData();
        bodyFromData.append('content',content);
        if(postImage)
        bodyFromData.append('File',postImage);
        post(END_POINTS.CreatePost,bodyFromData,{headers:{'Content-Type': 'multipart/form-data'}})
        
    }
    //input image 
    const imageRef=useRef<HTMLInputElement>(null);
    //handel image button 
    const ImageButtonHandler=(e:React.MouseEvent<HTMLButtonElement>)=>{
        if(imageRef.current){
            imageRef.current.click();
            
        }
    }
    //handel pst image input 
    const postImageOnChange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files)
        setPostImage(e.target.files[0])
    }
    return (
        <>
            {props.isActive ? <div className="fixed h-screen w-full  left-0 top-0 z-20 bg-zinc-950 opacity-95 " >
                <button className="fixed right-3 top-2 text-3xl"onClick={props.toggleActive}>X</button>
                <div className="min-h-screen  flex flex-col items-center justify-center  " >
                    <div className="w-1/2 relative z-50 "onClick={()=>{console.log('ad')}}>
                        <form onSubmit={HandleOnSubmit}>

                            <div>
                                <div className="w-full flex flex-col items-center justify-center mb-3 ">
                                    <p className="text-3xl w-fit font-medium uppercase">Create new post </p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="content" className="font-semibold opacity-85 mb-1">Post content :</label>
                                    <textarea id="conent" name="content" placeholder="what is on your mind ... " onChange={(e) => { setContent(e.currentTarget.value)}} className=" outline-none border border-zinc-700 rounded-sm p-1 resize-none bg-zinc-800 opacity-100" rows={10} />
                                </div>
                                <div id="post-image-box" className="mt-2 w-32">
                                    {postImage ? <img src={URL.createObjectURL(postImage)}/>:null}
                                </div>
                                <div className=" w-full flex justify-end mt-3">
                                    <div className="w-full md:w-1/3 flex gap-1">
                                        <Button type="submit" disabled={postLoading}  >Post</Button>
                                        <SecButton className="bg-zinc-700 px-4 py-2" onClick={ImageButtonHandler}><FontAwesomeIcon icon={faPaperclip} size="1x" /></SecButton>
                                        <input type="file" ref={imageRef} onChange={postImageOnChange} className="hidden" accept="image/*" />
                                        <SecButton className="py-2 px-5 border border-zinc-800" onClick={props.toggleActive}   >Cancel</SecButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> : <></>}
        </>
    )
}
export default PostCreatePopup;