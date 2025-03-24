import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh] p-6">
      <Loader2 className="h-12 w-12 text-primary-light animate-spin" />
    </div>
  );
}