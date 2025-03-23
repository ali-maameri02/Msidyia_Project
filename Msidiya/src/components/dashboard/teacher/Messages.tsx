import * as React from 'react';
import './style.css';
import TelegramIcon from '@mui/icons-material/Telegram';


export default function Messages(){
    const userPicrtureStyle = {
        
    };
    return (
        <main className="flex flex-col justify-center items-center  mt-20 bg-transparent main px-32 ">
                <div className='grid lg:grid-cols-12 md:grid-cols-1 msg-container' style={{height:'80vh'}} >
                    <div className='col-span-4 bg-gray-100 sm:my-2'>
                        <div className='bg-blue-500 py-2 text-center'>
                            <input placeholder='Search Here' style={{width:'80%'}} className="p-2 rounded-xl border-none focus:outline-blue-500"></input>
                        </div>
                        <div className='grid bg-blue-200 mx-2 my-1 p-2 rounded-2xl'  >
                            <div className='grid grid-cols-7'>
                                <div className='col-span-1 flex justify-center align-middle '>
                                    <div className='w-14 h-14 rounded-full border-2 bg-white the-msg-photo-cover'  ></div>
                                </div>
                                <div className='col-span-4  grid'>
                                    <p className='font-bold'>Dr.Hello</p>
                                    <p className='text-sm'>hi how are you I wish you ?</p>
                                </div>
                                <div className='col-span-2  '>
                                    <p className='text-xs text-center'>Aug 29,2024</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid active:bg-blue-200 hover:cursor-pointer mx-2 my-1 p-2 rounded-2xl'  >
                            <div className='grid grid-cols-7'>
                                <div className='col-span-1 flex justify-center align-middle '>
                                    <div className='w-14 h-14 rounded-full border-2 bg-white the-msg-photo-cover'  ></div>
                                </div>
                                <div className='col-span-4  grid'>
                                    <p className='font-bold'>Dr.You</p>
                                    <p className='text-sm'>We dont have class Today</p>
                                </div>
                                <div className='col-span-2  '>
                                    <p className='text-xs text-center'>Aug 29,2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-8 bg-gray-200'>
                        <div className='py-2 text-center border-b-2 border-gray-300'>
                               <div className='w-10 h-10 rounded-full border-2 bg-white the-msg-photo-cover'  ></div>
                        </div>
                        <div className='p-2'>
                             <div className="bg-gray-100 rounded-2xl px-1 py-2" style={{height:"60vh"}}>
                                <div className=''>
                                    <p className="p-2 bg-blue-200 w-1/4 rounded-2xl   ">Hello sir how are you</p>
                                    <p className='text-xs text-gray-400 p-2 '>8/5/27, 8:35 PM</p>
                                </div>
                                <div className='float-right'>
                                    <p className="p-2 bg-gray-300 w-4/4 rounded-2xl   ">I'm fine thanx what about you ?</p>
                                    <p className='text-xs text-gray-400 p-2 '>8/5/27, 8:35 PM</p>
                                </div>
                             </div>
                             <div className='bg-gray-100 grid grid-cols-6 my-2'>
                                <div className='col-span-5 rounded-2xl p-2'>
                                        <input placeholder='Type A message ' className='p-2 focus:outline-blue-500' style={{width:"100%"}}></input>
                                </div> 
                                <div className='col-span-1 flex justify-center align-middle '>
                                    <p className='text-5xl hover:cursor-pointer '><TelegramIcon/></p>
                                </div> 
                             </div>
                        </div>
                        
                    </div>
                   
                </div>

        </main>

    )
}