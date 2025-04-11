import { UseFormRegisterReturn, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

type InputFieldProps = {
  label: string;
  description?: string;
  inputValue?: string;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  readonly?: boolean;
  numbersOnly?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  mask?: (value: string) => string;
  disabled?: boolean;
  name?: string;
  isNumeric?: boolean;
};

function InputFieldWithWatch({
  name,
  mask,
  value,
  setValue
}: {
  name: string;
  mask?: (value: string) => string;
  value: string;
  setValue: (value: string) => void;
}) {
  const fieldValue = useWatch({ name });

  useEffect(() => {
    if (fieldValue !== undefined) {
      setValue(mask ? mask(fieldValue) : fieldValue);
    }
  }, [fieldValue, mask, setValue]);

  return null;
}

export default function InputField({
  label,
  description,
  inputValue,
  type = 'text',
  placeholder,
  min,
  max,
  step,
  maxLength,
  readonly = false,
  numbersOnly,
  error,
  register,
  mask,
  disabled,
  name,
  isNumeric = false
}: InputFieldProps) {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (inputValue !== undefined) {
      setCharCount(inputValue.length);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!name || !maxLength) return;
    const fieldValue = value || '';
    setCharCount(fieldValue.length);
  }, [value, name, maxLength]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (mask) {
      newValue = mask(newValue);
    }

    setValue(newValue);

    if (register) {
      let finalValue: string | number = newValue;

      if (isNumeric) {
        const numericValue = parseFloat(
          newValue.replace(/[^0-9,-]/g, '').replace(',', '.').replace(/\D+/g, '')
        );
        finalValue = isNaN(numericValue) ? '' : numericValue;
      }

      register.onChange({
        target: {
          value: finalValue,
          name: register.name
        }
      });
    }
  };

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex justify-between items-baseline">
        <label className="block text-sm font-bold text-gray-700 dark:text-text-secondary">{label}</label>
        {maxLength && !disabled && (
          <span
            className={`text-xs ${charCount > maxLength ? 'text-danger' : 'text-gray-500 dark:text-text-secondary'}`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-text-secondary">{description}</p>
      )}

      {name && <InputFieldWithWatch name={name} mask={mask} value={value} setValue={setValue} />}

      <input
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-input-border rounded-md shadow-sm focus:border-primary-dark focus:outline-none dark:focus:border-primary-dark
        transition-colors appearance-none text-gray-900 dark:text-text-primary h-[42px] ${disabled ? 'bg-gray-100 dark:bg-gray-dark' : 'bg-white dark:bg-input'}`}
        style={{ fontFamily: 'inherit' }}
        readOnly={readonly}
        value={value || inputValue}
        onChange={handleChange}
        onBeforeInput={(e) => {
          const data = e.nativeEvent.data;
          if (
            (numbersOnly && data && !/^\d+$/.test(data)) ||
            (data === ' ') // bloqueia espaços
          ) {
            e.preventDefault();
          }
        }}

        ref={register ? register.ref : undefined}
        disabled={disabled}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
