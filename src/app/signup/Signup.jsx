"use client"
import { toast } from "react-toastify";
import React  from 'react'
import { useState } from 'react';
import Image from 'next/image';
import signUpBanner from "../../assets/singup.svg";
import { addUser } from '@/services/userService';
const Signup = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:"https://www.google.com/imgres?q=default%20profile%20url&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F009%2F292%2F244%2Fsmall%2Fdefault-avatar-icon-of-social-media-user-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=JNzXO3Fe39JcaM&vet=12ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA..i&w=200&h=200&hcb=2&ved=2ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA",
      });

      const  handleAdduser=async(e)=>{
e.preventDefault();
console.log(data)

if (data.name.trim() === "" || data.name == null) {
  toast.warning("Name is required !!", {
    position: "top-center",
  });
  return;
}

try {
    const result = await addUser(data);

    console.log(result);

    toast.success("User is registered !!", {
      position: "top-center",
    });

    setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:"https://www.google.com/imgres?q=default%20profile%20url&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F009%2F292%2F244%2Fsmall%2Fdefault-avatar-icon-of-social-media-user-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=JNzXO3Fe39JcaM&vet=12ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA..i&w=200&h=200&hcb=2&ved=2ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA",
      });
} catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    toast.error("Signup Error !! " + error.response.data.message, {
      position: "top-center",
    });
}
      }

      const resetForm = () => {
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
          profileURL:"https://www.google.com/imgres?q=default%20profile%20url&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F009%2F292%2F244%2Fsmall%2Fdefault-avatar-icon-of-social-media-user-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=JNzXO3Fe39JcaM&vet=12ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA..i&w=200&h=200&hcb=2&ved=2ahUKEwj0rcD7j5iMAxX6ZWwGHTNaH1cQM3oECFYQAA",
        });
      };
  return (
    <div className="grid grid-cols-12">
    <div className="col-span-4 col-start-5 ">
      <div className="py-5">
        <div className="flex justify-center m-5">
          <Image
            src={signUpBanner}
            alt="signup banner"
            style={{
              width: "40%",
            }}
          />
        </div>
        <h1 className="text-3xl text-center">Signup Here </h1>
        <form action="#!" className="mt-5" onSubmit={handleAdduser} >
          {/* name */}
          <div className="mt-3">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium mb-2 ps-2"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-2xl bg-blue-200 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              name="user_name"
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              value={data.name}
            />
          </div>
          {/* email */}
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2 ps-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-2xl bg-blue-200 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              id="user_email"
              name="user_email"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              value={data.email}
            />
          </div>
          {/* password */}
          <div className="mt-3">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2 ps-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-2xl bg-blue-200 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              id="user_password"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              value={data.password}
            />
          </div>
          {/* about section */}
          <div className="mt-3">
            <label
              htmlFor="user_about"
              className="block text-sm font-medium mb-2 ps-2"
            >
              About
            </label>
            <textarea
              className="w-full p-3 rounded-2xl bg-blue-200 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              id="user_about"
              name="user_about"
              rows={8}
              onChange={(e) => {
                setData({
                  ...data,
                  about: e.target.value,
                });
              }}
              value={data.about}
            ></textarea>
          </div>
          <div className="mt-3 text-center">
            <button
              type="submit"
              className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
            >
              Signup
            </button>
            <button
     
              type="button"    onClick={resetForm}
              className="px-3 py-2 bg-orange-600 ms-3 rounded hover:bg-orange-400"
            >
              Reset
            </button>
          </div>

          {/* {JSON.stringify(data)} */}
        </form>
      </div>
    </div>
  </div>
);
};
  

export default Signup
