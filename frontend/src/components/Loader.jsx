function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex flex-col items-center gap-4">
        {/* SPINNER */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* TEXT */}
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
