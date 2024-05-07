import React, { FormEvent, MouseEventHandler, ReactEventHandler, ReactHTMLElement, useEffect, useRef, useState } from "react";
import { Button } from "../../Components";
import Input from "../../Components/ui/InputText";
import { usePost } from "../../hooks/usePost";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../../types/User";
import axios from "axios";
import { BaseAxios } from "../../constants/Api/BaseAxios";

const ProfilePage = () => {
    //for sidebar profile section
    const [profile, setProfile] = useState(true);
    //for sidebar account section
    const [account, setaccount] = useState(false);
    // for sidebar
    const [visiable, setVisiable] = useState(false);

  
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setProfile(true); setaccount(false)
    }
    const { Fetch, data, loading, error } = useFetch<User>();
    // fill the field 
    const [email, setEmail] = useState('sssss');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState<string >('');
    const [lastName, setLastName] = useState<string >('');
    const [CurrentImageUrl, setCurrentImageUrl] = useState<string|undefined>('');
    let imageUrl='';
    // a function to fill user Feild like userName,firstname etc..
    const FillFeild=(user:User)=>{

        setUserName(user.userName);

        if(user.firstName){
            setFirstName(user.firstName);
        }
        if(user.lastName){
            setLastName(user.lastName);
        }
        if(user.imageUrl){
            setCurrentImageUrl(user.imageUrl)
            
        }
        
    }
    //function to get user info
    const FetchUserInfo = () => {
        Fetch('http://socialapp.somee.com/api/User/get-current-user');
    }
    // for hidden input file
    const uploadButton = useRef<HTMLInputElement>(null);
    // to make the screen on loading modee
    const [isUploading, handelUploading] = useState(false);
    
    const [image, setImage] = useState<File|undefined>(undefined)
    useEffect(() => {
        if (data === undefined) {
            FetchUserInfo();
        }
        if (data !== undefined && loading === false ) {
            
            setCurrentImageUrl(!data.response.imageUrl?'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png':data.response.imageUrl)
            FillFeild(data.response)
        }


    }, [data, loading])
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // uploadImage(e.target.files[0]);
            if(e.target.files[0]){
                setImage(e.target.files[0]);
                setCurrentImageUrl(URL.createObjectURL(e.target.files[0]))
            }
            
        }
    }
    const uploadImage = async () => {

        if (image) {
            let imagePath='';
            var bodyFormData = new FormData();
            bodyFormData.append("key", "c9954cccf67ed46e1ecee26c8b991de2");
            bodyFormData.append("image", image);
            await axios.post('https://api.imgbb.com/1/upload', bodyFormData).then(res=>{
                imagePath=res.data.data.display_url;
                
                imageUrl=imagePath;
                setCurrentImageUrl(imagePath)
                
            }).catch(err=>{throw Error('uploading image filed')})
            
            
        }
    }
    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        handelUploading(true);
        const url = `https://localhost:7082/api/User/${data?.response?.id}/profile`;
       
   
        try {
            await uploadImage();
            console.log(imageUrl)
            const requestBody = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                id: data?.response.id,
                imageUrl:imageUrl
            };
            const response = await BaseAxios.put(url, requestBody);

            console.log('Response:', response.data);
        } catch (error) {
            console.log(`image ${imageUrl}`)
            console.error('Error:', error);
        }
      
        
        console.log(imageUrl)
        handelUploading(false);
    }
    return (
        <>
            {data === undefined ? <></> : <div className=" w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
                <p onClick={() => { setVisiable(!visiable) }} className={`block md:hidden cursor-pointer border w-fit px-2 py-1 rounded-full`}>settings</p>
                <aside className={`${visiable ? 'block' : 'hidden'}  bg-zinc-900 py-4 md:w-1/3 lg:w-1/4 md:block`}>
                    <div className="sticky flex flex-col gap-2 p-4 text-sm  top-12">

                        <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                        <button type="button" onClick={onClickHandler} className={`flex items-center px-3 py-2.5 font-bold rounded-full transition-all ${profile ? ' bg-indigo-900  text-white border-indigo-800 ' : ' hover:bg-indigo-900  hover:text-white hover:border-indigo-800 '} `}>
                            Pubic Profile
                        </button>
                        <button type="button" onClick={() => { setProfile(false); setaccount(true) }}
                            className={`flex items-center px-3 py-2.5 font-semibold  rounded-full  ${account ? ' bg-indigo-900  text-white border-indigo-800 ' : ' hover:bg-indigo-900  hover:text-white hover:border-indigo-800 '}`}>
                            Account Settings
                        </button>

                    </div>
                </aside>

                {profile ? <main className="w-full relative bg-zinc-900 min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl opacity-40">USER INFO</h2>
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">


                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300  dark:ring-indigo-500"
                                        src={CurrentImageUrl} alt="Bordered avatar" />

                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <input type="file" ref={uploadButton} onChange={onChangeHandler} hidden accept="image/png, image/gif, image/jpeg"/>
                                        <Button type="button" onClick={() => {
                                            uploadButton.current?.click()
                                        }}
                                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-indigo-900 rounded-lg border border-none hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                            Change picture
                                        </Button>
                                        <button type="button"
                                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-zinc-100 rounded-lg border  hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                            Delete picture
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={onSubmitHandler}>
                                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                                        <div
                                            className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                            <div className="w-full">
                                                <label htmlFor="first_name"
                                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                    First name :</label>
                                                <Input type="text" id="first_name"
                                                    name="firstName" className="pl-3" onChange={(e) => { setFirstName(e.target.value); console.log(firstName) }}
                                                    placeholder="Your first name" defaultValue={data.response.firstName} />
                                            </div>

                                            <div className="w-full">
                                                <label htmlFor="last_name"
                                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                    Last name :</label>
                                                <Input type="text" id="last_name"
                                                    name="lastName" className="pl-3" onChange={(e) => { setLastName(e.target.value) }}
                                                    placeholder="Your last name" defaultValue={data.response.lastName} />
                                            </div>

                                        </div>

                                        <div className="mb-2 sm:mb-6">
                                            <label htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                                email :</label>
                                            <Input type="text" id="email"
                                                name="email" className="pl-3" onChange={(e) => { setEmail(e.target.value) }}
                                                placeholder="Your email" defaultValue={data.response.email} />
                                        </div>

                                        <div className="mb-2 sm:mb-6">
                                            <label htmlFor="profession"
                                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Username :</label>
                                            <Input type="text" id="userName"
                                                name="userName" className="pl-3" onChange={(e) => { setUserName(e.target.value) }}
                                                placeholder="Your userName" defaultValue={data.response.userName} />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="message"
                                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                            <textarea id="message" rows={4}
                                                className="text-sm sm:text-base placeholder-gray-400  pr-4 rounded-lg border bg-zinc-700 text-white pl-2 border-zinc-800 w-full py-2  focus:outline-none focus:border-zinc-400 "
                                                placeholder="Write your bio here..."></textarea>
                                        </div>


                                        <div className="flex justify-end ">
                                            <div className="w-1/3">
                                                <Button type="submit">Save</Button>

                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>



                    </div>
                    {isUploading ? 
                    <div id='on-update' className="bg-zinc-500 absolute w-full h-full top-0 left-0 opacity-80 animate-pulse">
                    </div> : <></>}
                </main> : <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">

                        {/* password section */}
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl opacity-40">Password</h2>
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">


                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="items-center mt-8 sm:mt-2 text-[#202142]">


                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="current-password"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Current Password</label>
                                        <Input type="password" id="current-password"
                                            name="current-password" className="pl-3" onChange={() => { }}
                                            placeholder="current password" />
                                    </div>

                                    <div className="mb-2 sm:mb-6">
                                        <label htmlFor="new-password"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">new-password</label>
                                        <Input type="password" id="new-password" name="new-password" className="pl-3" onChange={() => { }} placeholder="New password" />
                                    </div>



                                    <div className="flex justify-end ">
                                        <div className="w-1/3">
                                            <Button type="submit">Save</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>}
            </div>}
        </>
    );
}
export default ProfilePage;