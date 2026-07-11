import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";

import { Navbar } from "../index";
import AppRoutes from "./routes/AppRoutes";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;