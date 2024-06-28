"use client";

import { useState } from "react";
import { clearAuth, setToken, setUser } from "@/redux/auth/auth.slice";
import useAuthSession from "../hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";
import { validate } from "@/helpers/zod";
import { login } from "@/helpers/auth";
import toast from "react-hot-toast";
import { delay } from "@/helpers/delay";

export type ErrorState = {
  username?: string;
  password?: string;
};

/*
  Comments in the code showing 
  the previous way of handling form Validtion before using toast 
*/

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<ErrorState | null>(null);
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const data = await validate(
      { username, password }
      // setError
    );
    if (!data) return;
    setLoading(true);

    try {
      await delay(600); // To Simulate a network request
      const token = await login(data);
      toast.success("Login successful");
      dispatch(setToken(token));
      dispatch(setUser({ username }));
      localStorage.setItem("token", token);
    } catch (error) {
      toast.error((error as Error).message);
    }
    // setError(null);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearAuth());
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
            <button
              onClick={() => handleLogout()}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <form>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />

            {/* {error?.username ? (
              <p className="text-red-600 font-bold">{error.username}</p>
            ) : null} */}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />

            {/* {error?.password ? (
              <p className="text-red-600 font-bold">{error.password}</p>
            ) : null} */}

            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
              type="submit"
            >
              {!loading ? "Login" : "Logging in"}
            </button>
          </form>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">
            The hook should be usable like this:{" "}
          </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
