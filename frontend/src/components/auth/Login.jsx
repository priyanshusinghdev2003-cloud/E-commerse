import React, { useContext } from "react";
import { useAuthStore } from "../../context/auth";

function Login({ setLoginForm, setRegisterForm }) {
  const login = useAuthStore((state) => state.login);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    login(data.user);
  };
  return (
    <div className=" h-dvh w-dvw flex justify-center items-center absolute z-1 bg-black/40">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <p
          className="text-black font-bold cursor-pointer float-right relative -top-5"
          onClick={() => setLoginForm(false)}
        >
          X
        </p>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" name="remember" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => {
              setLoginForm(false);
              setRegisterForm(true);
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
