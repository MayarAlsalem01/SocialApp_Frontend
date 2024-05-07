import { useContext, useEffect } from "react";
import { Content } from "..";
import { AuthContext } from "../../hooks/Auth/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../../types/User";
import { END_POINTS } from "../../constants/Api/endpoints";
import { AuthModel } from "../../types/AuthModel";





const Index =()=>{

    const user=useContext(AuthContext);
    const {loading,data,Fetch,error}=useFetch<AuthModel>()
   
    useEffect( ()=>{
      
        if(loading ===false && data ===undefined){
            Fetch(`${END_POINTS.GetCurrentUser}`);
            
            console.log("asdas")
        }else{
            user?.setAuthModel(data?.response)
            
        }
        if(error){
            console.log('token is not vaild ')
        }
    },[loading,data])
    return(
        <>
            <Content/>
        </>
    )
}
export default Index;