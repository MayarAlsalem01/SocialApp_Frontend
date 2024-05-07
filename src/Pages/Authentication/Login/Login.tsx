

import { useEffect } from "react";
import LoginForm from "./loginForm";
import { Link } from "react-router-dom";
import axios from "axios";


// https://localhost:7082/api/Auth/login
const Login = () => {
    axios.get('http://socialapp.somee.com/api/Post?pageNumber=1&pageSize=10')
    .then(res=>console.log(res))
    .catch(err=>console.log(`error ${err}`))
    return (
        <>
            <div className="min-h-screen  flex flex-col items-center justify-center bg-zinc-950">
                <div className=" flex flex-col bg-zinc-900 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-200">Login To Your Account</div>
                    {/* <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                        <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
                        <span>Login with Facebook</span>
                    </button>
                    <div className="relative mt-10 h-px bg-gray-300">
                        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
                        </div>
                    </div> */}
                    <div className="mt-10">
                   <LoginForm/>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <Link to='/register' target="_self" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </span>
                            <span className="ml-2">You don't have an account? </span>
                        </Link>
                    </div>
                </div>
            </div>
           
        </>
    );

}
export default Login;