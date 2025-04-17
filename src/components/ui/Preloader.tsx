"use client";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // delay for fade out
          return 100;
        }
        return prev + 10;
      });
    }, 100); // speed

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white  text-[#FFCDD2] flex flex-col items-center justify-center transition-opacity duration-500">
      <h1 className="text-9xl font-bold mb-4 tracking-wide">NUKE</h1>
      <div className="w-2/3 bg-white/20 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFCDD2] transition-all duration-100 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-300">Loading... {progress}%</p>
    </div>
  );
};

export default Preloader;
