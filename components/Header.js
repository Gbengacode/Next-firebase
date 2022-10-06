import React, { useContext } from "react";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter  } from "next/router";
const Header = () => {
  const { currentUser, logOut } = useAuth();
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {}
  };
  return (
    <div className="flex w-full justify-between items-center p-5">
      <h1 className="text-white text-4xl select-none">
        {" "}
        <Link href="/">Todo List</Link>
      </h1>
      <Link href="/task">
        <a className="text-white font-bold">Task</a>
      </Link>
      <span className="flex gap-5 text-white text-3xl cursor-pointer">
        
        <BiUserCircle />
        {currentUser ? <p onClick={handleLogout}>Logout</p> : null}
      </span>
    </div>
  );
};

export default Header;
