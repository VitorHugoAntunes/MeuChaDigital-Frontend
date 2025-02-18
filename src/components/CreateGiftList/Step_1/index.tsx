"use client";

import EventTypeOption from "@/components/EventTypeOption";
import InputField from "@/components/InputField";
import InputTextArea from "@/components/InputTextArea";
import { useState } from "react";

export default function Step1() {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  return (
    <div className="mb-4 flex flex-col w-full">
      <form>
        <div className="flex flex-col gap-4 mb-6">
          <label className="block text-sm font-medium text-gray-700">Tipo do evento</label>
          <div className="grid grid-cols-3 gap-4">
            <EventTypeOption label="Casamento" value="wedding" selected={selectedEventType} onSelect={setSelectedEventType} />
            <EventTypeOption label="Aniversário" value="birthday" selected={selectedEventType} onSelect={setSelectedEventType} />
            <EventTypeOption label="Chá de bebê" value="babyShower" selected={selectedEventType} onSelect={setSelectedEventType} />
          </div>
        </div>

        <InputField label="Nome do evento" placeholder="Digite o nome do evento" />
        <InputField label="Data do evento" type="date" />
        <InputTextArea label="Descrição" placeholder="Descreva o evento" />
      </form>
    </div>
  );
}
