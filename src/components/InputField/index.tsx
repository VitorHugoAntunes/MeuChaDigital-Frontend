import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  description?: string;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  error?: string;
  register: UseFormRegisterReturn;
};

export default function InputField({ label, description, type = "text", placeholder, min, max, step, readonly = false, error, register }: InputFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={type === "number" ? step : undefined}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors appearance-none text-gray-900 h-[42px]"
        style={{ fontFamily: 'inherit' }}
        readOnly={readonly}
        {...register}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}