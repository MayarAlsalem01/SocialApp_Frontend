import axios from "axios";
import { ReactHTMLElement, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { END_POINTS } from "../../../constants/Api/endpoints";
import Input from "../../../Components/ui/InputText";
import { usePost } from "../../../hooks/usePost";
import { AuthContext } from "../../../hooks/Auth/AuthContext";
import { AuthModel } from "../../../types/AuthModel";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { postData, postLoading, post } = usePost<AuthModel>();
    const navgaite = useNavigate();
    const authProvider = useContext(AuthContext);
    useEffect(() => {
        if (!postLoading && postData !== undefined) {
            console.log(postData)
            localStorage.setItem('userToken', postData.response.token);
            authProvider?.setAuthModel(postData.response)
            navgaite('/')
        }
    }, [postLoading, postData])
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        post(END_POINTS.Register, { email: email, password: password, userName: username,firstName:firstName,lastName:lastName });


    }
    return (
        <>
            <form method="post" onSubmit={onSubmitHandler}>
                 {/* first & last name */}
                 <div className="flex flex-col md:flex-row md:gap-1">
                    <div className="flex flex-col mb-6">
                        <label htmlFor="firstName" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">First name:</label>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                            </div>

                            <Input id="firstName" type="text" name="firstName" onChange={(e) => { setFirstName(e.currentTarget.value) }} placeholder="first name" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                    <label htmlFor="lastName" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Last name:</label>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                        </div>

                        <Input id="lastName" type="text" name="lastName" onChange={(e) => { setLastName(e.currentTarget.value) }}  placeholder="Last name" />
                    </div>
                </div>
                </div>
                {/* username */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="userName" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                        </div>

                        <Input id="username" type="text" name="username" onChange={(e) => { setUserName(e.currentTarget.value) }} placeholder="Username" />
                    </div>
                </div>
                {/* email  */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <Input id="email" type="email" name="email" onChange={(e) => { setEmail(e.currentTarget.value) }} placeholder="E-Mail Address" />
                    </div>
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                        </div>

                        <Input id="password" type="password" name="password" onChange={(e) => { setPassword(e.currentTarget.value) }} placeholder="Password" />
                    </div>
                </div>
             
               
                <div className="flex items-center mb-6 -mt-4">
                    <div className="flex ml-auto">
                        <Link to='/login' className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Do you have an account ?</Link>
                    </div>
                </div>

                <div className="flex w-full">
                    <button type={postLoading ? 'button' : 'submit'} className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                        <span className="mr-2 uppercase">{postLoading ? 'loading' : 'Register'}</span>
                        <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
        </>
    )
}
export default RegisterForm