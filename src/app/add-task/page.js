"use client"

import React, { useState } from 'react'
 import loginSvg from "../../assets/login.svg";
 import Image from "next/image";
 import { addTask } from '@/services/taskService';
 import { taost, toast } from "react-toastify";



const AddTask = () => {


  const [task,setTask]=useState({title:"",status:"none",content:"",userId:"67d6997807564cef7be0c635"})


const handleAddTask = async (event) => {
  event.preventDefault();
console.log(task)
  // validate task data
  try {
    const result = await addTask(task);
    console.log(result);
    toast.success("Your task is added !!", {
      position: "top-center",
    });

    setTask({
      title: "",
      content: "",
      status: "none",
    });
  } catch (error) {
    console.log(error);
    toast.error("Task not added !!", {
      position: "top-center",
    });
  }
};
  return (
<>
<div className="grid grid-cols-12 bg-fuchsia-200 justify-center">
      <div className="col-span-4 col-start-5 p-5  shadow-sm">
        <div className="my-8 flex justify-center">
          <Image
            src={loginSvg}
            style={{
              width: "50%",
            }}
            alt="Login banner"
          />
        </div>
        <h1 className="text-3xl text-center">Add your task here </h1>

        <form action="#!" onSubmit={handleAddTask} >
          {/* task title  */}
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl bg-gray-200 focus:ring-gray-400-100 border border-gray-800"
              id="task_title"
              name="task_title"
              onChange={(e) => {
              setTask({...task,title: e.target.value});
              }}
              value={task.title}
            />
          </div>
          {/* task CONENT  */}
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl bg-gray-200 focus:ring-gray-400-100 border border-gray-800"
              id="task_content"
              rows={4}
              name="task_content"
              onChange={(e) => {
                setTask({...task,content: e.target.value});
             
              }}
              value={task.content}
            />
          </div>

          {/* task status */}
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded-3xl bg-gray-200 focus:ring-gray-400-100 border border-gray-800"
              name="task_status"
              onChange={(e) => {
                setTask({...task,status: e.target.value});
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* button  actions */}
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">
              Add Task{" "}
            </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">
              Clear
            </button>
          </div>
{/* 
          {JSON.stringify(task)} */}
        </form>
      </div>
    </div>
</>
  )
}

export default AddTask
