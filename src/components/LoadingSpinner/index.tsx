import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen p-6">
      <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
    </div>
  );
}