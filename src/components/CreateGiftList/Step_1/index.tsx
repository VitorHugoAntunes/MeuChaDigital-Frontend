"use client";

import { useState } from 'react';

export default function Step1() {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  return (
    <div className="mb-4 flex flex-col w-full">
      <form>
        <div className="flex flex-col gap-4 mb-6">
          <label className="block text-sm font-medium text-gray-700">Tipo do evento</label>

          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex justify-center items-center gap-2 p-4 border rounded-md cursor-pointer transition-all ${selectedEventType === 'wedding'
                ? 'border-primary shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedEventType('wedding')}
            >
              <span className="text-sm">Casamento</span>
            </div>

            <div
              className={`flex justify-center items-center gap-2 p-4 border rounded-md cursor-pointer transition-all ${selectedEventType === 'birthday'
                ? 'border-primary shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedEventType('birthday')}
            >
              <span className="text-sm">Aniversário</span>
            </div>

            <div
              className={`flex justify-center items-center gap-2 p-4 border rounded-md cursor-pointer transition-all ${selectedEventType === 'babyShower'
                ? 'border-primary shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedEventType('babyShower')}
            >
              <span className="text-sm">Chá de bebê</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Nome do evento</label>
          <input
            type="text"
            placeholder="Digite o nome do evento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Data do evento</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            placeholder="Descreva o evento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </form>
    </div>
  );
}