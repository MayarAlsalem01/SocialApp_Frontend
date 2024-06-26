import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hooks/Auth/AuthContext';
import logo from '../../assest/logo.png'
import { Post } from '../../types/Post';
import * as signalR from "@microsoft/signalr";
import { END_POINTS } from '../../constants/Api/endpoints';
import { User } from '../../types/User';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Profile', href: '/profile', current: false },

]

function classNames(...classes: (string | undefined | null | false | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}


const TNavBar = () => {
    const [notifications, SetNotifications] = useState<Post[]>([]);
    const [notification, setNotification] = useState<Post>()
    const [userProfile,setUserProfile]=useState<User>();
    const [arry, setArry] = useState<Post[]>([]);
    const user = useContext(AuthContext);
    const connectionToken = localStorage.getItem('userToken');
    var connection = new signalR.HubConnectionBuilder()
        .withUrl(END_POINTS.domainName + END_POINTS.NotificationHub, { accessTokenFactory: () => connectionToken ? connectionToken : '' })
        .build();



    connection.on("RecieveNotfication", (notification: Post) => {

        setNotification(notification)



    });
     connection.start().catch(err => console.log(err));
    const navigate = useNavigate();
    
    useEffect( () => {
      
        if (notification !== undefined && user) {
            if (notification.user.userName !== user.authModel?.userName) {
                SetNotifications(notifications => [...notifications, notification])
            }
        }
        
            

    }, [notification,])
    if (user) {
        
        return (
            <Disclosure as="nav" className="bg-zinc-950 sticky top-0 z-20">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-2 ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    {/* notifation dropdowan */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <div className='relative'>
                                                    <BellIcon className='w-6 ' />
                                                    {notifications.length > 0 ? <span className='absolute w-3 h-3 text-xs p-2 rounded-[50%] bg-red-600 -top-1 -left-1 flex justify-center items-center'>{notifications.length}</span> : null}
                                                </div>

                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute  right-0 z-10 mt-2 w-64 md:w-96 origin-top-right rounded-md bg-zinc-800 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">


                                                {notifications.length > 0 ? <Menu.Item >
                                                    <div className='flex flex-col gap-4 '>
                                                        {notifications.map(item => (
                                                            <div key={item.id} className=' flex items-center relative after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[1px] after:bg-zinc-500 cursor-pointer'>
                                                                <div className='w-16'>
                                                                    <img className='object-contain' src={logo} alt="" />
                                                                </div>
                                                                <div className='px-2 text-base'>
                                                                    <p className='font-light leading-4'>
                                                                        { item.user.userName} posted a new post: {item.content.slice(0,20)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                </Menu.Item> : <></>}

                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 object-cover rounded-full"
                                                    src={user.authModel?.imageUrl ? user.authModel.imageUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <span
                                                            onClick={
                                                                () => {
                                                                    if (localStorage.getItem('userToken')) {
                                                                        localStorage.removeItem('userToken')
                                                                        navigate('/login');
                                                                        user.setAuthModel(undefined)
                                                                    }
                                                                }}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </span>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        )
    } else {
        return null
    }
}

export default TNavBar