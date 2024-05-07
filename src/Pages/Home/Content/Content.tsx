import React, { useEffect } from "react";
import { PostLayOut , PostCreateSection } from "../../../Components";
import { END_POINTS } from "../../../constants/Api/endpoints";
import { useFetch } from "../../../hooks/useFetch";
import { Post as postType } from "../../../types/Post";
import { Pagination } from "../../../types/Pagination";


const Content = () => {

    const { data, loading, Fetch } = useFetch<Pagination<postType>>();
   
    useEffect(() => {
        Fetch(END_POINTS.PostPagination, { params: { pageSize: 10, pageNumber: 1 } })
            
    }, [])

    return (

        <div className=" flex relative ">
            <div id="sidebar" className=" hidden lg:block lg:w-1/12 xl:w-1/6 h-screen relative ">
                <div className="h-full w-1/6 fixed ">
                    
                </div>
            </div>
            <div id="content" className="p-3 lg:p-0 flex-1 flex flex-col items-center ">
                <div className="w-full lg:w-5/6 xl:w-4/6 gap-1 lg:gap-1 flex flex-col  ">
                    <PostCreateSection />
                    {loading ? <p>loading</p> : data ? data.response.data.map(post =>
                        <PostLayOut post={post} key={post.id}   />
                    ) : <></>}


                </div>
            </div>
            <div className="hidden lg:block lg:w-1/12 xl:w-1/6">

            </div>
        </div>
    )

}
export default Content;