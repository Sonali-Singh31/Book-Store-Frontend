import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const {loginUser, signInWithGoogle} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // register user
  const onSubmit = async(data) =>{
      console.log(data);
      try {
        await loginUser(data.email,data.password)
        alert('user login successfully!')
        navigate('/')
      } catch (error) {
        setMessage('invalid email and password');
        console.log(error)
      }
    }

  const handleGoogleSubmit=async()=>{
    try {
      await signInWithGoogle();
      alert('login successfully!!');
      navigate('/');
    } catch (error) {
      alert('google signIn failed');
      console.log(error)
    }
  }
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-5">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven&apos;t an account? Please
          <Link to="/Register" className="text-blue-500 hover:text-blue-700">
            {" "}
            Register
          </Link>
        </p>
        {/* signIn with google */}
        <div className="mt-4">
          <button 
            onClick={handleGoogleSubmit}
            className="w-full  flex flex-wrap justify-center items-center gap-1 bg-secondary hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 focus:outline-none">
            <FaGoogle className="mr-2" />
            SignIn with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 test-sm">
          {" "}
          &copy;2025 Book Store. All right reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
