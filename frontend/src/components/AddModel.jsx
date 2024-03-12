import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios'

function AddModel() {

    const [taskTitle,setTaskTitle]=useState('');
    const [taskDescription,setTaskDescription]=useState('');
    const [taskDate,setTaskDate]=useState('');

    const submitTaskHandler=()=>{
        if(taskTitle.trim()=="" || taskDate.trim()==""){
            alert( "Please fill out Title and Date fields" );
        }

    }

    

  return (
    <div>
        <Box className='bg-white w-[45rem] h-[30rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-10'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
                <label htmlFor="tname">Task Name</label>
                <input type="text" id='tname' onChange={(e)=>setTaskTitle(e.target.value)}/>
                <br />

                <label htmlFor="tdes">Description</label>
                <input type="text" id='tdes' onChange={(e)=>setTaskDescription(e.target.value)}/>
                <br />

                <label htmlFor="tdate">Date</label>
                <input type='date' id='tdate' onChange={(e)=>setTaskDate(e.target.value)}/>
                <br />


                <button type='reset'>Clear</button>
                <button type='submit' onClick={submitTaskHandler}>Add Task</button>
            </form>
          </Typography>
        </Box>
    </div>
  )
}

export default AddModel