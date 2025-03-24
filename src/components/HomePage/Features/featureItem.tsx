import NavLink from '@/components/NavLink';
import { Tag, Users, ListChecks, ArrowRight } from 'lucide-react';

interface FeatureItemProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureItem({ title, description, icon }: FeatureItemProps) {
  return (
    <div className="flex flex-col gap-2 items-center text-center py-8 px-4 border-spacing-1 border-gray-200 border-2 rounded-lg">
      {icon === 'tag' && <Tag size={42} className="text-primary-light" />}
      {icon === 'invitees' && <Users size={42} className="text-primary-light" />}
      {icon === 'list-checks' && <ListChecks size={42} className="text-primary-light" />}
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>

      <NavLink
        href="/help"
        icon={<ArrowRight size={24} />}
      >
        Saiba mais
      </NavLink>
    </div>
  )
}