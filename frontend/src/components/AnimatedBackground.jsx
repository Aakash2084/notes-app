export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fbff]">

      {/* Left Blob */}
      <div className="absolute -left-52 bottom-0 h-[520px] w-[520px] rounded-full bg-blue-400/25 blur-3xl animate-blob"></div>

      {/* Right Blob */}
      <div className="absolute -right-44 -top-32 h-[520px] w-[520px] rounded-full bg-purple-400/25 blur-3xl animate-blob animation-delay-2000"></div>

      {/* Center Blob */}
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl animate-blob animation-delay-4000"></div>

      {/* Dots */}
      <div className="absolute left-10 top-10 h-44 w-44 opacity-30">
        <div className="grid grid-cols-8 gap-3">
          {Array.from({ length: 64 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-blue-500"
            ></span>
          ))}
        </div>
      </div>

      {/* Floating Circles */}
      <div className="absolute top-40 left-40 h-5 w-5 rounded-full border-2 border-blue-400 animate-float"></div>

      <div className="absolute bottom-32 right-40 h-8 w-8 rounded-full bg-purple-300 animate-float animation-delay-2000"></div>

      <div className="absolute top-1/2 right-72 h-4 w-4 rounded-full bg-blue-500 animate-float animation-delay-4000"></div>

      {/* Stars */}
      <div className="absolute top-24 left-1/4 text-yellow-400 animate-pulse text-xl">
        ✦
      </div>

      <div className="absolute bottom-28 right-1/3 text-pink-400 animate-pulse text-lg">
        ✦
      </div>

      <div className="absolute top-1/2 left-16 text-blue-500 animate-pulse">
        ✦
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
    </div>
  );
}