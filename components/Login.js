import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { useRouter } from "next/router";
const Login = () => {
  const { signIn, signUp, logOut } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        await signIn(auth, email, password);
        router.push("/dashboard")
      } catch (error) {
        setError("in correct user name and password");
      }
    } else {
      try {
        await signUp(auth, email, password);
        router.push("/")
      } catch (error) {
        setError("Fail to register")
      }
    }
  };
  return (
    <>
      <div className="text-red-500 text-center"> {error && error}</div>
      <div className=" flex-1  flex flex-col justify-center items-center">
        <h2 className="text-white  text-4xl font-medium">
          {isLoggedIn ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="mt-10 p-5 w-full outline-none 
          rounded xs:max-w-[30ch] duration-30 focus:border-cyan-300"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            className="mt-10 p-5 w-full outline-none 
          rounded xs:max-w-[30ch] duration-30 focus:border-cyan-300"
            value={password}
            onChange={handleChangePassword}
          />

          <input
            type="submit"
            onClick={handleSubmit}
            value="Submit"
            className="mt-10 p-3 w-full outline-none 
          rounded  duration-30 border text-white font-bold text-3xl cursor-pointer"
          />

          <h2
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className=" duration-300 hover:scale-110 text-center font-bold text-white text-3xl mt-5"
          >
            {!isLoggedIn ? "Login" : "Register"}
          </h2>
        </form>
      </div>
    </>
  );
};

export default Login;
