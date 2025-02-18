import { Calendar, Gift, Users } from 'lucide-react';
import Button from '../Button';
import Image from 'next/image';

interface ListCardProps {
  photo?: string;
  title: string;
  date: string;
  totalGifts: number;
  totalContributors: number;
  progress: number;
}

export default function ListCard({ title, date, totalGifts, totalContributors, progress }: ListCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col flex-1 w-full">
      <div className="w-full h-48 relative rounded-lg overflow-hidden bg-gray-300">
        <Image
          src="/list-placeholder.jpg"
          alt="Lista de Presentes"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className='flex flex-col gap-4 p-6'>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <div className="flex items-center">
            <Calendar size={20} className="text-text-secondary" />
            <p className="text-sm text-text-secondary ml-2">{date}</p>
          </div>
        </div>

        <div className="w-full">
          <div>
            <span className="text-sm text-text-secondary">Progresso das contribuições</span>
            <span className="text-sm text-text-secondary float-right">{progress}%</span>
          </div>

          <div className="bg-gray-200 h-2 rounded-full w-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center">
            <Gift size={20} className="text-text-secondary" />
            <p className="text-sm text-text-secondary ml-2">{totalGifts} presentes</p>
          </div>
          <div className="flex items-center">
            <Users size={20} className="text-text-secondary" />
            <p className="text-sm text-text-secondary ml-2">{totalContributors} contribuidores</p>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <Button variant="default" widthFull>
            Ver detalhes
          </Button>
        </div>
      </div>
    </div>
  );
}