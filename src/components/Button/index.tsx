import { LoaderCircle } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'google' | 'outlined-danger' | 'outlined-warning';
  borderStyle?: 'rounded' | 'rounded-full';
  widthFull?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'default',
  widthFull = false,
  borderStyle = 'rounded',
  type = 'button',
  loading = false,
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    default: 'bg-primary-light text-white px-8 py-2 rounded-full hover:bg-primary-dark',
    outlined: 'bg-transparent text-primary-light px-8 py-2 rounded-full border-2 border-primary-light hover:border-primary-dark hover:text-primary-dark',
    "outlined-danger": 'bg-transparent text-danger px-8 py-2 rounded-full border-2 border-gray-200 hover:border-danger-dark hover:text-danger-dark',
    "outlined-warning": 'bg-transparent text-warning px-8 py-2 rounded-full border-2 border-gray-200 hover:border-warning-dark hover:text-warning-dark',
    google: 'bg-white text-gray-700 px-8 py-2 rounded-full border border-gray-300 hover:bg-gray-50',
  };

  const buttonStyles = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={
        `${buttonStyles} transition-colors duration-300
         ${widthFull ? 'w-full flex items-center justify-center gap-4' : 'w-fit flex items-center justify-center gap-4'}
         ${borderStyle === 'rounded' ? 'rounded-md' : 'rounded-full'}
         ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {
        loading ? (
          <>
            <LoaderCircle size={20} className="animate-spin" />
            Carregando...
          </>
        ) : children
      }
    </button>
  );
}
