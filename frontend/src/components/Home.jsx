import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import Loader from './Loader';
import Checkbox from '@mui/joy/Checkbox';


import Modal from '@mui/material/Modal';
import AddModel from './AddModel';



function Home() {

    const [time,setTime]=useState("Good Morning!");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const currentDate = new Date().toLocaleDateString('en-US', options);

    const [todos,setTodos]=useState([])
    const [loading,setLoading]=useState(false);

    const [addTodo,setAddTodo]=useState(false);
    const handleOpen = () => setAddTodo(true);
    const handleClose = () => setAddTodo(false);
    
    useEffect(()=>{    
        
        const currentTime = new Date().getHours();
        if(currentTime<12){
            setTime('Good Morning!')
        }else{
            setTime('Good Afternoon!')
        }
    })
    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:3000/todo')
        .then((res)=>{
            setTodos(res.data)
            setLoading(false)
        })
        .catch((err)=>console.error(err))
    },[])

    const updateTodos = (newTodo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };
    
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
            <button className='w-[2rem] h-[2rem] flex items-center justify-center bg-black text-white p-1 rounded-lg' ><IoIosSearch/></button>
            </div>

            <button className=' bg-black text-white w-[2.5rem] h-[2.5rem] p-2 rounded-full flex items-center justify-center'onClick={handleOpen}><FaPlus/></button>

            {/* test code*/}
             <Modal
        open={addTodo}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddModel updateTodos={updateTodos} handleClose={handleClose}/>
      </Modal>
            {/* test code*/}
            </div>



            <select className='border-2 border-black p-3 w-[10rem] rounded-xl'>
                <option value="">Today</option>
                <option value="">This Week</option>
                <option value="">Completed</option>
                <option value="">This Month</option>
            </select>

        </div>

        <div>
            {loading?(<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'><Loader/></div>):(
                <div>{todos.map((item,index)=>(

                    <div className='flex w-full p-3 justify-between items-center bg-black text-white rounded-xl my-3' key={item._id}>
                    <Checkbox size="lg" variant="solid" />
                    <div>
                    <h1 className='font-bold text-[1rem] text-left'>{item.title}</h1>
                    <p className='font-thin text-[0.9rem]'>{item.description}</p>
                    </div>
                    <h1>{new Date(item.todoDate).toLocaleDateString()}</h1>
                </div>


                ))}</div>
            )}
        </div>


        
                {/* <div className='flex w-full p-3 justify-between items-center bg-black text-white rounded-xl'>
                    <Checkbox size="lg" variant="solid" />
                    <div>
                    <h1 className='font-bold text-[1rem] '>Learn Something</h1>
                    <p className='font-thin text-[0.9rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, veritatis!</p>
                    </div>
                    <h1>12/24/2022</h1>
                </div> */}



    </div>
  )
}

export default Home