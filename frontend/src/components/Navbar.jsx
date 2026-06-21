import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null;
  }

  async function handleLogout() {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    }
  }

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-800">
          Notes
          <span className="text-blue-500">App</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* WHEN USER LOGGED IN */}
          {isAuthenticated ? (
            <>
              {/* DASHBOARD */}
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-500 transition text-sm md:text-base font-medium"
              >
                Dashboard
              </Link>

              {/* ADD NOTE */}
              <Link
                to="/add-note"
                className="text-gray-700 hover:text-blue-500 transition text-sm md:text-base font-medium"
              >
                Add Note
              </Link>

              {/* USER */}
              {user && (
                <span className="hidden sm:block text-sm text-gray-500">
                  Hi, {user.fullName || user.name}
                </span>
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500 transition text-sm md:text-base font-medium"
              >
                Login
              </Link>

              {/* SIGNUP */}
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
