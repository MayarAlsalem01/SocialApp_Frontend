import { AxiosRequestConfig } from "axios";
import { useState } from "react"
import { BaseAxios } from "../constants/Api/BaseAxios";
import { ApiResponse } from "../types/ApiResponse";

export const useFetch = <TData>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [data, setData] = useState<ApiResponse<TData>>();

    const Fetch = async (endpoint: string, config?: AxiosRequestConfig) => {
        setLoading(true);
        await BaseAxios.get(endpoint, config)
            .then(res => {
                setData(res.data);
                setLoading(false);
            }).catch(err => {
                setError(err)
                setLoading(false);
                console.log(err)
            });
    }
    return { data, error, loading, Fetch }

}