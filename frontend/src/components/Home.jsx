import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';

function Home() {

    const [time,setTime]=useState("Good Morning!");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const currentDate = new Date().toLocaleDateString('en-US', options);

    const [todos,setTodos]=useState([])
    
    useEffect(()=>{    
        
        const currentTime = new Date().getHours();
        if(currentTime<12){
            setTime('Good Morning!')
        }else{
            setTime('Good Afternoon!')
        }
    })
    useEffect(()=>{
        axios.get('http://localhost:3000/todo')
        .then((res)=>{
            setTodos(res.data)
        })
        .catch((err)=>console.error(err))
    })
    
  return (
    <div className='mx-[20rem] mt-[3rem]'>
        <div className='font-bold text-[2rem]'>
            Hello Yasith, {time}👋
        </div>
        <div className='font-bold text-[1.5rem]'>{currentDate}</div>

        <div className='w-full flex items-center justify-between'>
            <div className='flex gap-x-4 items-center'>
            <div className='flex items-center border-2 border-black p-2 rounded-xl'>
            <input type="text" placeholder='Search Task' className='w-[35rem] h-[2rem] focus:outline-none'/>
            <button className='w-[2rem] h-[2rem] flex items-center justify-center bg-black text-white p-1 rounded-lg'><IoIosSearch/></button>
            </div>

            <button className=' bg-black text-white w-[2.5rem] h-[2.5rem] p-2 rounded-full flex items-center justify-center'><FaPlus/></button>
            </div>

            <select className='border-2 border-black p-3 w-[10rem] rounded-xl'>
                <option value="">Today</option>
                <option value="">This Week</option>
                <option value="">Completed</option>
                <option value="">This Month</option>
            </select>

        </div>
    </div>
  )
}

export default Home