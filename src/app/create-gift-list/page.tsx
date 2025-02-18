import { Suspense } from "react";
import CreateGiftList from '@/components/CreateGiftList';

export default function CreateGiftListPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CreateGiftList />
    </Suspense>
  );
}
