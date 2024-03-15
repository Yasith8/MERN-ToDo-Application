import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Loader from './Loader';

function AddModel({ updateTodos, handleClose }) {

    const [taskTitle,setTaskTitle]=useState('');
    const [taskDescription,setTaskDescription]=useState('');
    const [taskDate,setTaskDate]=useState('');
    const [loading,setLoading]=useState(false);
   

    const submitTaskHandler=()=>{
        if(taskTitle.trim()=="" || taskDate.trim()==""){
            alert( "Please fill out Title and Date fields" );
        }

         const todo={
          title:taskTitle,
          description:taskDescription,
          todoDate:taskDate
        }
        setLoading(true)
        axios.post("http://localhost:3000/todo", todo)
        .then(()=>{
          setLoading(false)
          updateTodos(todo);
          handleClose()
        })
        .catch((err)=>{
          console.log(err);
          setLoading(false);
        })
    }


  

    

  return (
    <div>
      {loading?(<Loader/>):(

        <Box className='bg-white w-[45rem] h-[25rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-10'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <div className='flex items-center justify-evenly mt-4'>
                <label htmlFor="tname">Task Name: </label>
                <input type="text" id='tname' onChange={(e)=>setTaskTitle(e.target.value)} className='border-2 p-2 border-black rounded-md w-[20rem]'/>
                
              </div>
                 
              <div className='flex items-center justify-evenly mt-4'>
                <label htmlFor="tdes">Description</label>
                <textarea id='tdes' onChange={(e)=>setTaskDescription(e.target.value)} className='border-2 p-2 border-black rounded-md w-[20rem]'/>
              </div>

              <div className='flex items-center justify-evenly mt-4'>
                <label htmlFor="tdate">Date</label>
                <input type='date' id='tdate' onChange={(e)=>setTaskDate(e.target.value)} className='border-2 p-2 border-black rounded-md w-[20rem] ml-11'/>
                </div>

              <div className='flex items-center justify-between mt-6'>
                <button className='w-[8rem] border-2 border-slate-950  h-[3rem] p-2 mx-[5rem] rounded-md font-bold' type='reset'>Clear</button>
                <button className='w-[8rem] bg-slate-950 border-2 border-slate-950 text-white h-[3rem] p-2 mx-[5rem] rounded-md font-bold' type='submit' onClick={submitTaskHandler}>Add Task</button>
                </div>
            </form>
          </Typography>
        </Box>
    )}
    </div>
  )
}

export default AddModel