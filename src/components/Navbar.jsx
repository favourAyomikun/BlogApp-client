import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const { token, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F9F9F9] fixed top-0 container max-w-full shadow-md shadow-gray-400">
      {/* { Desktop Section } */}
      <div className="flex justify-around items-center h-[60px]">
        <Link
          to={"/"}
          className="text-2xl md:text-3xl font-semibold hover:underline underline-offset-4 text-[#888888]"
        >
          F.A's Blog
        </Link>
        <ul className="hidden md:flex items-center font-semibold text-[17px] space-x-8">
          <li className="hover:underline underline-offset-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:underline underline-offset-4">
            <Link to={"/about"}>About</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to={"/createPost"} className="button">
                  Create new post
                </Link>
              </li>
              <li>
                <Link onClick={logOut} className="button">
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"} className="button">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/createAccount"} className="button">
                  Create Account
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* { Mobile Section} */}
        <div className="md:hidden">
          {isOpen ? (
            <FaTimes onClick={toggleBar} className="cursor-pointer text-xl relative z-40 right-5 transition-all duration-300" />
          ) : (
            <FaBars onClick={toggleBar} className="cursor-pointer text-xl" />
          )}
          {isOpen && (
            <div className="absolute bg-[#F9F9F9] border border-r-0 border-gray-400 w-[50%] h-[20rem] top-0 right-0">
              <ul className="flex flex-col items-center space-y-10 font-semibold text-[17px] relative top-20">
                <li className="hover:underline underline-offset-4 text-base">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:underline underline-offset-4 text-base">
                  <Link to={"/about"}>About</Link>
                </li>
                {token ? (
                  <>
                    <li>
                      <Link to={"/createPost"} className="button text-base">
                        Create new post
                      </Link>
                    </li>
                    <li>
                      <Link onClick={logOut} className="button text-base">
                        Log Out
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/login"} className="button text-base">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={"/createAccount"} className="button text-base">
                        Create Account
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
