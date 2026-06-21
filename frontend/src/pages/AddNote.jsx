import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { createNote } from "../redux/slices/noteSlice";

import { useNavigate } from "react-router-dom";

function AddNote() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.notes);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(createNote(formData));

    if (createNote.fulfilled.match(result)) {
      toast.success("Note Created");
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 mx-4">
        {/* HEADING */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create Note ✍️</h1>

          <p className="text-gray-500 mt-2">
            Write and save your important thoughts
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Note Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter note title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="General">General</option>

              <option value="Work">Work</option>

              <option value="Study">Study</option>

              <option value="Personal">Personal</option>

              <option value="Ideas">Ideas</option>
            </select>
          </div>
          {/* CONTENT */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Note Content
            </label>

            <textarea
              name="content"
              placeholder="Write your note here..."
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition disabled:bg-gray-400 font-medium text-lg"
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
