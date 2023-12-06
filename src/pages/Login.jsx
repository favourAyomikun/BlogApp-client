import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://blog-app-server-mavt.onrender.com/login`, {
        username,
        password,
      });
      const token = response.data.token;

      setSuccessMessage("Login successful");
      setErrorMessage("");
      setUsername("");
      setPassword("");
      logIn(token);

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
      setSuccessMessage("");
      console.log("Login error", error);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-32">
        <div className="max-w-md w-[80%] md:w-full mx-auto bg-[#F9F9F9] p-8 rounded-md shadow-xl">
          {errorMessage && (
            <small className="text-red-400 font-semibold flex justify-center text-base">
              {errorMessage}
            </small>
          )}
          {successMessage && (
            <small className="text-green-400 font-semibold flex justify-center text-base">
              {successMessage}
            </small>
          )}
          <form onSubmit={handleLogin}>
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
              Login
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm">
              Don't have an account?
              <Link
                to={"/createAccount"}
                className="font-semibold hover:underline underline-offset-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
