import { useEffect, useState } from "react";

import { Loader } from "../../index";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchNotes, deleteNote } from "../redux/slices/noteSlice";

import toast from "react-hot-toast";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const { notes, loading, error } = useSelector((state) => state.notes);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotes());
    }
  }, [isAuthenticated, dispatch]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmDelete) return;

    const result = await dispatch(deleteNote(id));

    if (deleteNote.fulfilled.match(result)) {
      toast.success("Note Deleted");
    }
  }

  const filteredNotes = (notes || []).filter(
    (note) =>
      (note?.title || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase()) ||
      (note?.content || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase()),
  );

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Notes 📒
          </h1>

          <p className="text-gray-500 mt-1">Manage your notes easily</p>
        </div>

        {/* ADD NOTE BUTTON */}
        {isAuthenticated && (
          <Link
            to="/add-note"
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition shadow-md text-center"
          >
            + Add Note
          </Link>
        )}
      </div>

      {/* LOADER */}
      {loading && <Loader />}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && isAuthenticated && (notes || []).length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Notes Yet
          </h2>

          <p className="text-gray-500 mb-6">
            Create your first note and start organizing your ideas.
          </p>

          <Link
            to="/add-note"
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Create Note
          </Link>
        </div>
      )}

      {/* LOGIN MESSAGE */}
      {!isAuthenticated && (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Please Login First 🔐
          </h2>

          <p className="text-gray-500 mb-6">
            Login to create, edit, and manage your notes.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-green-500 text-white px-5 py-3 rounded-xl hover:bg-green-600 transition"
            >
              Signup
            </Link>
          </div>
        </div>
      )}

      {/* SEARCH */}
      {isAuthenticated && (
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
          />
        </div>
      )}

      {/* NOTES GRID */}
      {isAuthenticated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredNotes || [])
            .filter((note) => note && note._id)
            .map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition"
              >
                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3 break-words">
                  {note?.title || "Untitled"}
                </h2>

                {/* CATEGORY */}
                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-3">
                  {note?.category || "General"}
                </span>

                {/* CONTENT */}
                <p className="text-gray-600 mb-6 break-words line-clamp-4">
                  {note?.content || "No Content"}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  {/* EDIT */}
                  <Link
                    to={`/edit-note/${note._id}`}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition text-sm font-medium"
                  >
                    Edit
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
