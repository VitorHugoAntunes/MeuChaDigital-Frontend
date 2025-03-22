import { UseFormRegisterReturn } from "react-hook-form";

type InputTextAreaProps = {
  label: string;
  placeholder?: string;
  inputValue?: string;
  error?: string;
  register?: UseFormRegisterReturn;
};

export default function InputTextArea({ label, placeholder, inputValue, error, register }: InputTextAreaProps) {
  return (
    <div className="mb-4 md:mb-6">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <textarea
        placeholder={placeholder}
        value={inputValue}
        className={
          `mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors`
        }
        {...register}
      />
      {error && <span className="text-danger text-sm mt-1">{error}</span>}
    </div>
  )
}