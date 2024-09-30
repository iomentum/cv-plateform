import React from "react";
import { Loader2 } from "lucide-react";

const LoadingWheel = ({ className = "" }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Loader2 className={`animate-spin text-primary ${className}`} />
    </div>
  );
};

export default LoadingWheel;
