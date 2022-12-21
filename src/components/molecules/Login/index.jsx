/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let iduser = localStorage.getItem('__iduser');

        if(iduser){
            navigate('/');
        }
    }, [navigate])
    

    async function LoginUser() {
        let data = {
            'username': username,
            'password':password,
        };

        try {
            let result = await axios.post("http://localhost:5000/auth/login", data); 
            localStorage.setItem('__iduser', result.data.data._id);
            alert(result.data.message)
            navigate('/');
        } catch (error) {
            alert(error.response.data.message);
        }

    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-slate-300 ring ring-2 ring-blue-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 underline uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onInput={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button onClick={()=> LoginUser()} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={()=>navigate('/register')}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}