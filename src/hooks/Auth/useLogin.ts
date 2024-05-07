import { useEffect, useState } from "react"
import { usePost } from "../usePost";
import { END_POINTS } from "../../constants/Api/endpoints";
import axios, { AxiosRequestConfig } from "axios";
import { AuthModel } from "../../types/AuthModel";

export const useLogin=()=>{
    
   
    const {postData,postError,postLoading,post}=usePost<AuthModel>();
    const Login= (email:string,password:string)=>{
        //validate email & password 
       
        //request 
        
         post(END_POINTS.Login,{email:email,password:password});
        
    }
    return {Login,postLoading,postData,postError}

}