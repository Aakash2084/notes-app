import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { updateNote } from "../redux/slices/noteSlice";

function EditNote() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { notes, loading, error } = useSelector((state) => state.notes);

  const { id } = useParams();

  const existingNote = notes.find((note) => note?._id === id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
  });

  useEffect(() => {
    if (existingNote) {
      setFormData({
        title: existingNote.title,
        content: existingNote.content,
      });
    }
  }, [existingNote]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(
      updateNote({
        id,
        noteData: formData,
      }),
    );

    if (updateNote.fulfilled.match(result)) {
      toast.success("Note Updated");
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 mx-4">
        {/* HEADING */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Edit Note ✏️</h1>

          <p className="text-gray-500 mt-2">Update your note details</p>
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
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Note Content
            </label>
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
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              placeholder="Update your note..."
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-4 rounded-xl hover:bg-yellow-600 transition disabled:bg-gray-400 font-medium text-lg"
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
