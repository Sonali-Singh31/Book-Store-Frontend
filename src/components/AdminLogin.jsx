import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import getBaseUrl from "../utils/baseURL";
const AdminLogin = () => {
  const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = async(data) =>{
        console.log(data);

        try {
          const response = await axios.post(`${getBaseUrl()}/api/auth/admin`,data,{
            headers:{
                "Content-Type":"application/json"
            }
          })
          const auth = response.data;
          console.log(auth)
          if(auth.token){
            localStorage.setItem('token',auth.token)
            setTimeout(()=>{
                localStorage.removeItem('token');
                alert('Token has been expire!, Please login again.')
                navigate('/')
            },3600*1000)
          }
          alert('Admin login successful!')
          navigate('/dashboard')
        } catch (error) {
          setMessage('invalid username and password');
          console.log(error)
        }
      }
  
  return (
    <div className="h-screen flex items-center justify-center">
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-5">Admin Dashboard Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        {message && (
          <p className="text-red-500 text-sm mb-3 italic">{message}</p>
        )}
        <div>
          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold px-8 py-2 rounded focus:outline-none">
            Login
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 test-sm">
          {" "}
          &copy;2025 Book Store. All right reserved.{" "}
        </p>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin
