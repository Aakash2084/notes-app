import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/slices/authSlice";

import { useNavigate, Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successful");
      navigate("/dashboard");
    }
    if (loginUser.rejected.match(result)) {
      toast.error(result.payload);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-4">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h1>

          <p className="text-gray-500 mt-2">Login to continue to NotesApp</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
