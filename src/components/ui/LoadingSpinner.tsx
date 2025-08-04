// components/ui/LoadingSpinner.tsx
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <Loader2 className="h-8 w-8 animate-spin text-2xl text-primary" />
    </div>
  );
};

export default LoadingSpinner;
