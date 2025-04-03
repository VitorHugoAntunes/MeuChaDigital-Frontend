import { LoaderCircle } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger' | 'outlined' | 'google' | 'outlined-danger' | 'outlined-warning' | 'neutral';
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
    default: 'bg-primary-light text-white rounded-full border-2 border-primary-light',
    danger: 'bg-danger text-white rounded-full border-2 border-gray-dark',
    outlined: 'bg-white dark:bg-gray-dark text-primary-light rounded-full border-2 border-primary-light dark:border-input-border',
    "outlined-danger": 'bg-transparent dark:bg-gray-dark dark:border-input-border text-danger rounded-full border-2 border-gray-dark',
    "outlined-warning": 'bg-transparent dark:bg-gray-dark dark:border-input-border text-warning rounded-full border-2 border-gray-dark',
    neutral: 'bg-gray-100 text-gray-700 rounded-full border-2 border-gray-dark dark:bg-gray-dark dark:text-text-secondary dark:border-input-border',
    google: 'bg-white text-gray-700 rounded-full border border-gray-300',
  };

  const hoverStyles = {
    default: 'hover:bg-primary-dark hover:border-primary-dark',
    danger: 'hover:border-danger-dark hover:text-white hover:bg-danger-dark',
    outlined: 'hover:border-primary-dark hover:text-primary-dark',
    "outlined-danger": 'hover:border-danger-dark dark:hover:border-danger-dark hover:text-danger-dark',
    "outlined-warning": 'hover:border-warning-dark dark:hover:border-warning-dark hover:text-warning-dark',
    neutral: 'hover:bg-gray-dark dark:hover:bg-gray-light',
    google: 'hover:bg-gray-50',
  };

  const buttonStyles = `${variantStyles[variant]} ${!disabled ? hoverStyles[variant] : ''}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={
        `py-2 px-6 lg:px-8 font-semibold
        ${buttonStyles} transition-colors duration-300
         ${widthFull ? 'w-full flex items-center justify-center gap-4' : 'w-fit flex items-center justify-center gap-4'}
         ${borderStyle === 'rounded' ? 'rounded-md' : 'rounded-full'}
         ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`
      }
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