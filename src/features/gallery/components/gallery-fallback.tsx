import { Html } from "@react-three/drei";

export default function GalleryFallback() {
  return (
    <Html fullscreen>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-800">
        <div className="relative w-24 h-24 bg-amber-50 rounded-full border-4 border-amber-200 flex items-center justify-center mb-6 animate-bounce">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-50 border-4 border-amber-200 rounded-full" />
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-50 border-4 border-amber-200 rounded-full" />
          <div className="absolute w-3 h-3 bg-amber-900 rounded-full left-6 top-8" />
          <div className="absolute w-3 h-3 bg-amber-900 rounded-full right-6 top-8" />
          <div className="absolute w-4 h-3 bg-amber-800 rounded-full top-12" />
        </div>

        <h1 className="text-xl font-semibold mb-4">갤러리 준비중...</h1>

        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-orange-400 animate-progress" />
        </div>

        <p className="mt-4 text-sm text-gray-500">잠시만 기다려주세요</p>

        <style>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-progress {
            animation: progress 1.5s linear infinite;
          }
        `}</style>
      </div>
    </Html>
  );
}
