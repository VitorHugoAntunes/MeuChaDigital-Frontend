import { UseFormRegisterReturn } from "react-hook-form";

interface InputSelectProps {
  label: string;
  options: string[];
  values?: (string | number)[];
  error?: string;
  register: UseFormRegisterReturn;
}

export default function InputSelect({ label, options, values, error, register }: InputSelectProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors bg-white h-[42px] font-inter`}
        {...register}

      >
        <option value="">Selecione</option>
        {options.map((option, index) => (
          <option key={option} value={values ? values[index] : option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}