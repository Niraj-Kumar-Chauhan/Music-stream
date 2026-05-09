import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ nameOrEmail: "", password: "" });

  const inputHandler = (e) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://music-stream-ub1v.onrender.com/api/auth/login", userData, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <form onSubmit={submitHandler} className="relative w-full max-w-md bg-zinc-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h2>
          <p className="text-zinc-500 text-sm">Tune in to your favorites</p>
        </div>
        <div className="space-y-4">
          <Input name="nameOrEmail" type="text" label="Username or Email" onChangeInput={inputHandler} inputValue={userData.nameOrEmail} />
          <Input name="password" type="password" label="Password" onChangeInput={inputHandler} inputValue={userData.password} />
        </div>
        <Button text="Sign In" type="submit" />
        <p className="text-center text-zinc-500 text-xs font-medium">
          Don't have an account? <span onClick={() => navigate("/register")} className="text-purple-500 cursor-pointer hover:underline font-bold">Create One</span>
        </p>
      </form>
    </div>
  );
}

export default Login;