import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { useState, useEffect } from "react";

type InputTextAreaProps = {
  label: string;
  placeholder?: string;
  maxLength?: number;
  description?: string;
  inputValue?: string;
  resize?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  name?: string;
};

export default function InputTextArea({
  label,
  placeholder,
  maxLength,
  description,
  inputValue,
  resize = true,
  error,
  register,
  name
}: InputTextAreaProps) {
  const { watch } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (inputValue !== undefined) {
      setCharCount(inputValue.length);
    } else if (name && watch) {
      const subscription = watch((value) => {
        const fieldValue = name ? value[name] : '';
        setCharCount(fieldValue?.length || 0);
      });
      return () => subscription.unsubscribe();
    }
  }, [inputValue, name, watch]);

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex justify-between items-baseline">
        <label className="block text-sm font-bold text-gray-700 dark:text-text-secondary">
          {label}
        </label>
        {maxLength && (
          <span className={`text-xs ${charCount > maxLength ? 'text-danger' : 'text-gray-500 dark:text-text-secondary'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>

      {description && <p className="text-sm text-gray-500 dark:text-text-secondary">{description}</p>}

      <textarea
        placeholder={placeholder}
        value={inputValue}
        maxLength={maxLength}
        className={
          `mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-input-border'} text-gray-900 dark:text-text-primary bg-white dark:bg-input rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors dark:focus:border-primary-dark ${resize ? 'resize-y' : 'resize-none'} min-h-[80px] max-h-[120px]`
        }
        onChange={(e) => {
          setCharCount(e.target.value.length);
          register?.onChange(e);
        }}
        {...register}
      />

      {error && <span className="text-danger text-sm mt-1">{error}</span>}
    </div>
  );
}