/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5005');

const Content = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState(null)
  const [usersChat, setusersChat] = useState(null)
  const [messages, setmessages] = useState(null)
  const [message, setmessage] = useState(null)
  const [user, setuser] = useState(null)
  // socket.emit("userLogin")

  const __iduser =localStorage.getItem('__iduser');

  function sortData(data){
    data.sort(function (a, b) {
      return a.time.localeCompare(b.time);
    });

    return data;
  }
  
  useEffect(() => {
    socket.emit("userLogin");
    socket.on("userRefresh", (data) => {
      getUsers();
      getUsersByChat()
      // setmessage(null)
    })

    socket.on("messageRefresh", (data) => {
      getUsersByChat()
      getMessages(user)
      // if (user) {
      // }
    })
  }, [])
  
  function getUsers() {
    let data={
      _iduser:__iduser
    }
    axios.get('http://localhost:5000/users', {params:data}).then(response => {
      setusers(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  function getMessages(params) {
    setuser(params)
    let data = {
      from:__iduser,
      to:params.username
    }
    axios.get('http://localhost:5000/chats', {params:data}).then(response => {
      setmessages(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }
  
  function SubmitMessage() {
    let data = {
      body:message,
      _id:__iduser,
      to:user.username
    }
    setmessage("")  

    axios.post('http://localhost:5000/chats', data).then(response => {
      socket.emit('postMessage')
      getUsersByChat()
      getMessages(response.data.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  function getUsersByChat() {
    let data = {
      _id:__iduser
    }
    axios.post('http://localhost:5000/users/chat', data).then(response => {
      setusersChat(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }
  
  function checkUser(params) {
    console.log('====================================');
    console.log(params);
    console.log('====================================');
  }

  useEffect( () => {
    let iduser = __iduser;

    if(!iduser){
      navigate('/login');
    }

    getUsers()
    getUsersByChat()

  }, [navigate])

  async function LogoutUser(){
    let data = {
      '_iduser': __iduser
    };
    try {
        let result = await axios.post("http://localhost:5000/auth/logout", data); 
        localStorage.removeItem('__iduser');
  
        socket.emit("userLogout");
  
        alert(result.data.message)
        navigate('/login');
    } catch (error) {
        alert(error.response.data.message);
    }

  }
  return (
    <div className="h-screen p-0 m-0 mx-auto">
    <div className="min-w-full border rounded lg:grid lg:grid-cols-4 h-screen">
      <div className="border-r border-gray-300 lg:col-span-1">
        <div className="mx-3 my-3">
          <div className="relative text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
              placeholder="Search" required />
          </div>
          <a className="cursor-pointer" onClick={() => LogoutUser()}>Logout</a>
        </div>

        <ul className="overflow-auto h-[30rem]">
          <h2 className="my-2 mb-2 ml-2 text-lg text-slate-900">Chats</h2>
          <li>
            {usersChat && usersChat.map((userChat) => {
              return (
                  <a onClick={() => getMessages(userChat.usersChat[0])}
                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none" key={userChat._id}>
                      <div className="object-cover relative w-12 h-10 rounded-full flex justify-center items-center bg-slate-300">
                        <a className="text-xl">{userChat.usersChat.length > 0 ? userChat.usersChat[0].fullname.substr(0, 1) : 'A'}</a>
                        {userChat.usersChat[0].isActive ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-8 top-0">
                        </span> : ''}
                      </div>
                      <div className="w-full pl-2 pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">{userChat.usersChat.length > 0 ? userChat.usersChat[0].fullname : 'Anonymous'}</span>
                          <span className="block ml-2 text-sm text-gray-600">{userChat.usersChat[0].isActive ? 'Online' : 'Offline'}</span>
                        </div>
                        <span className="block ml-2 text-sm text-gray-600">{userChat.chats.length > 0 ? userChat.chats.at(-1).body : ''}</span>
                      </div>
                    </a>
              )
            })}
          </li>
        </ul>
        <ul className="overflow-auto h-[20rem] mt-10">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-800">Contacs</h2>
          <li>
            {users && users.map((user) => {
              return (
                <a onClick={() => getMessages(user)}
              className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none" key={user._id}>
                <div className="relative object-cover w-12 h-10 rounded-full flex justify-center items-center bg-slate-300">
                  <a className="text-xl">{user.fullname.substr(0, 1)}</a>
                  {user.isActive ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-8 top-0">
                </span> : ''}
                </div>
                <div className="w-full pl-2 pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">{user.fullname}</span>
                    <span className="block ml-2 text-sm text-gray-600">{user.isActive ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </a>
              )
            })}
          </li>
        </ul>
      </div>
      <div className="hidden lg:col-span-3 lg:block">
        {messages && (
          <div className="w-full">
          <div className="relative flex items-center p-3 border-b border-gray-300">
              <div className="object-cover relative w-10 h-10 rounded-full flex justify-center items-center bg-slate-300">
                <a className="text-xl">{user.fullname.substr(0, 1)}</a>
              </div>
            <span className="block ml-2 font-bold text-gray-600">{user.fullname}</span>
            {user.isActive ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
            </span> : ''}
          </div>
          <div className="relative w-full p-6 overflow-y-auto h-[49rem]">
            <ul className="space-y-2">
              {messages && sortData(messages).map((message) => {
                return (
                  <li className={`flex ${user.username === message.to ? 'justify-end' : 'justify-start'}`}>
                    <div className={`relative max-w-xl px-4 py-2  ${user.username === message.to ? 'bg-gray-100' : ''} text-gray-700 rounded shadow`}>
                      <span className="block">{message.body}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex items-center justify-end align-bottom w-full p-3 border-t border-gray-300">

            <input type="text" placeholder="Message"
              className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message" value={message} required onInput={(e) => setmessage(e.target.value)}/>
            <button type="submit" onClick={() => SubmitMessage()}>
              <svg className="w-10 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
        )}
        {!messages && (
          <div className="w-full flex justify-center items-center h-full">
            <h1 className="text-lg text-slate-500">Belum Ada Chat</h1>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Content;
