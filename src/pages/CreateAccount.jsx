import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username & Password are required");
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
      return;
    }

    try {
      await axios.post(`https://blog-app-server-mavt.onrender.com/register`, {
        username,
        password,
      });

      setSuccessMessage("Registration Successful");
      setUsername("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000)
    } catch (error) {
      setErrorMessage("Unable to register user. Please try again.");
      console.error("Unable to register user", error);
    }
  };

  return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-40">
        <div className="max-w-md w-[80%] md:w-full mx-auto bg-[#F9F9F9] p-8 rounded-md shadow-xl">
          {errorMessage && (
            <small className="text-red-400 font-semibold flex justify-center text-base">{errorMessage}</small>
          )}
          {successMessage && (
            <small className="text-green-400 font-semibold flex justify-center text-base">
              {successMessage}
            </small>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="font-semibold text-base md:text-lg">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="mt-3 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="font-semibold text-base md:text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-3 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="button w-full font-semibold text-base md:text-lg"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
