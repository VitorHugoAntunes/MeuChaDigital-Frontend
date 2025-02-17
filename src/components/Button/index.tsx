interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outlined';
  widthFull?: boolean; // Nova propriedade para controlar a largura
}

export default function Button({
  children,
  onClick,
  variant = 'default',
  widthFull = false, // Define o valor padrão como false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variant === 'outlined'
        ? 'bg-transparent text-primary-light px-8 py-2 rounded-full border-2 border-primary-light hover:border-primary-dark hover:text-primary-dark'
        : 'bg-primary-light text-white px-8 py-2 rounded-full hover:bg-primary-dark'
        } transition-colors duration-300 ${widthFull ? 'w-full' : 'w-auto self-start'}`}
    >
      {children}
    </button>
  );
}
