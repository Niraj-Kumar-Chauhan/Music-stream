import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('in signup')
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData,
        {
          withCredentials: true
        }
      );
      console.log(res.data);
      setSuccess(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log('after set token in browser cookies')
      setError("");
      setUserData({
        username: "",
        email: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setSuccess("");
      setError(err?.response || "somthing went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-black to-gray-500 flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5 text-black"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <Input
          name="username"
          type="text"
          placeholder="Enter username"
          label="Username"
          id="username"
          onChangeInput={inputHandle}
          inputValue={userData.username}
        />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          id="email"
          onChangeInput={inputHandle}
          inputValue={userData.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          id="password"
          onChangeInput={inputHandle}
          inputValue={userData.password}
        />

        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">Role</label>

          <select
            name="role"
            value={userData.role}
            onChange={inputHandle}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
               bg-white text-gray-700
               focus:outline-none focus:ring-2 focus:ring-purple-500 
               focus:border-purple-500 transition duration-200"
          >
            
            <option value="user">Role: User</option>
            <option value="artist">Artist</option>
          </select>
        </div>

        <Button text="Sign Up" type="submit" />

        <p className="text-xs sm:text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span onClick={() => navigate('/login')} className="text-purple-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
