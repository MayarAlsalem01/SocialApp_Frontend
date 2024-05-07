export type ApiResponse<TResponse> ={
    statusCode:number;
    message:string;
    response:TResponse;
}