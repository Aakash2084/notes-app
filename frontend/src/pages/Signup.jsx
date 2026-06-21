import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { signupUser, checkAuth } from "../redux/slices/authSlice";

import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(
      signupUser({
        fullName,
        email,
        password,
      }),
    );

    if (signupUser.fulfilled.match(result)) {
      await dispatch(checkAuth()); // 🔥 IMPORTANT

      toast.success("Account Created");

      navigate("/dashboard");
    }
  }
  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-4">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Create Account 🚀
          </h1>

          <p className="text-gray-500 mt-2">
            Signup to start managing your notes
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

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
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
