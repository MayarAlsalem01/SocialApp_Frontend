import { useState } from "react";
import { BaseAxios } from "../constants/Api/BaseAxios";
import { AxiosRequestConfig } from "axios";

export  const useDelete=()=>{
    const [DeleteData, setData] = useState<any>(undefined);
    const [DeleteLoading, setLoading] = useState<boolean>(false);
    const [DeleteError, setError] = useState<any>(undefined);
    const Delete = (endpoint: string, config: AxiosRequestConfig) => {

        
        BaseAxios.delete(endpoint, config)
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
    return { DeleteData, DeleteError, DeleteLoading, Delete }
}