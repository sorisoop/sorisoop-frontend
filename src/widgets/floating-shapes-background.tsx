export default function FloatingShapesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none max-w-screen-lg mx-auto z-0">
      <div className="absolute top-[70%] sm:top-10 left-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-green-100 to-green-200 opacity-30 animate-pulse" />
      <div
        className="absolute top-[75%] sm:top-32 right-8 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-40 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      />
      <div
        className="absolute bottom-10 sm:bottom-24 left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 opacity-35 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-6 sm:bottom-16 right-6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 opacity-25 animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "4s" }}
      />
      <div
        className="absolute top-[65%] sm:top-12 right-20 w-10 h-4 sm:w-14 sm:h-6 md:w-16 md:h-8 bg-gradient-to-r from-green-200 to-green-300 opacity-40 rounded-full transform rotate-45 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-20 left-4 w-8 h-3 sm:w-10 sm:h-4 md:w-12 md:h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 opacity-50 rounded-full transform -rotate-12 animate-pulse"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}
