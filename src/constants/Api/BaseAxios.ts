import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
import { END_POINTS } from "./endpoints";
const domainName=END_POINTS.domainName
export const BaseAxios = axios.create({
    baseURL: domainName,
    headers: {
        Accept: "application/json",
    },
});

BaseAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");
        if(token){
            const tokenDecode=jwtDecode(token)
            if(tokenDecode.exp){
                if(tokenDecode.exp * 1000 < new Date().getTime()){
                    console.log('token expire')
                    
                    localStorage.removeItem('userToken');
                    redirect('/login')
                
                }
                else{
                    console.log('token vaild ')
                }
            }
        }
       
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        
        Promise.reject(error);
    }
);