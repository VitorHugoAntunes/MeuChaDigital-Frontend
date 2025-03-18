import { Suspense } from "react";
import CreateGiftList from '@/components/CreateGiftList';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CreateGiftListPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateGiftList />
    </Suspense>
  );
}
