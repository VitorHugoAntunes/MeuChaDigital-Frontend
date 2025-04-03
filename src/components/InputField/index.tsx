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
  readonly?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  mask?: (value: string) => string;
  disabled?: boolean;
  name?: string;
  isNumeric?: boolean;
};

function InputFieldWithWatch({ name, mask, value, setValue }: {
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

  return null; // Este componente não renderiza nada, apenas atualiza o valor
}

export default function InputField({ label, description, inputValue, type = "text", placeholder, min, max, step, readonly = false, error, register, mask, disabled, name, isNumeric = false }: InputFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (mask) {
      newValue = mask(newValue);
    }

    setValue(newValue);

    if (register) {
      let finalValue: string | number = newValue;

      if (isNumeric) {
        const numericValue = parseFloat(newValue.replace(/[^0-9,-]/g, '').replace(',', '.'));
        finalValue = isNaN(numericValue) ? '' : numericValue;
      }

      register.onChange({
        target: {
          value: finalValue,
          name: register.name,
        },
      });
    }
  };

  return (
    <div className="mb-4 md:mb-6">
      <label className="block text-sm font-bold text-gray-700 dark:text-text-secondary">{label}</label>
      {description && <p className="text-sm text-gray-600 dark:text-text-secondary">{description}</p>}

      {name && <InputFieldWithWatch name={name} mask={mask} value={value} setValue={setValue} />}
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-input-border rounded-md shadow-sm focus:border-primary-dark focus:outline-none dark:focus:border-primary-dark
        transition-colors appearance-none text-gray-900 dark:text-text-primary h-[42px] ${disabled ? 'bg-gray-100 dark:bg-gray-dark' : 'bg-white dark:bg-input'}`}
        style={{ fontFamily: 'inherit' }}
        readOnly={readonly}
        value={value || inputValue}
        onChange={handleChange}
        ref={register ? register.ref : undefined}
        disabled={disabled}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}