interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'google';
  borderStyle?: 'rounded' | 'rounded-full';
  widthFull?: boolean; // Nova propriedade para controlar a largura
}

export default function Button({
  children,
  onClick,
  variant = 'default',
  widthFull = false,
  borderStyle = 'rounded',
}: ButtonProps) {
  const variantStyles = {
    default: 'bg-primary-light text-white px-8 py-2 rounded-full hover:bg-primary-dark',
    outlined: 'bg-transparent text-primary-light px-8 py-2 rounded-full border-2 border-primary-light hover:border-primary-dark hover:text-primary-dark',
    google: 'bg-white text-gray-700 px-8 py-2 rounded-full border border-gray-300 hover:bg-gray-50',
  };

  const buttonStyles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={
        `${buttonStyles} transition-colors duration-300
         ${widthFull ? 'w-full flex items-center justify-center gap-4' : 'w-fit flex items-center justify-center gap-4'}
         ${borderStyle === 'rounded' ? 'rounded-md' : 'rounded-full'}
      `}
    >
      {children}
    </button>
  );
}
