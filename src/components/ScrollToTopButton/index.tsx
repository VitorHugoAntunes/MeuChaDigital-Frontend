import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  showButton: boolean;
  onClick: () => void;
}

export default function ScrollToTopButton({ showButton, onClick }: ScrollToTopButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg
        hover:bg-primary-dark transition-all duration-300
        ${showButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}
      `}
      style={{
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      <ArrowUp size={24} />
    </button>
  );
}