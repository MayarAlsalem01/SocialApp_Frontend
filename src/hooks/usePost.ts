
import { useState } from "react";
import { BaseAxios } from "../constants/Api/BaseAxios";
import { ApiResponse } from "../types/ApiResponse";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const usePost = <T>() => {
    const [postData, setData] = useState<ApiResponse<T>>();
    const [postLoading, setLoading] = useState<boolean>(false);
    const [postError, setError] = useState<any>(undefined);
    const post = (endpoint: string, data:any ,config?:AxiosRequestConfig) => {

        
        BaseAxios.post(endpoint, data,config)
            .then(res => {
                setLoading(true);
                setData(res.data);
                console.log(res.data);
            }).catch(err => {
                setError(err)
                
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
    }
    const postFormData = (endpoint: string, config: FormData) => {

       
        setLoading(true);
        BaseAxios.post(endpoint, config)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            }).catch(err => {
                setError(err)
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
    }
    return { postData, postError, postLoading, post,postFormData }
}
