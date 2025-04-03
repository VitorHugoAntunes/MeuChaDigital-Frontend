import { UseFormRegisterReturn } from "react-hook-form";

interface InputSelectProps {
  label: string;
  options: string[];
  values?: (string | number)[];
  error?: string;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function InputSelect({ label, options, values, error, register, onChange }: InputSelectProps) {
  return (
    <div className="mb-4 md:mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-text-primary">{label}</label>
      <select
        className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-input-border"
          } rounded-md shadow-sm focus:border-primary focus:outline-none dark:focus:border-primary-dark transition-colors bg-white dark:bg-input h-[42px] font-inter text-gray-700 dark:text-text-primary`}
        {...register}
        {...(onChange && { onChange })}
      >
        <option className="dark:text-text-primary" value="">Selecione</option>
        {options.map((option, index) => (
          <option className="dark:text-text-primary" key={option} value={values ? values[index] : option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}