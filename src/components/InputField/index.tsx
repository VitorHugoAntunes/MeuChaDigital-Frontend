type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
};

export default function InputField({ label, type = "text", placeholder, readonly = false }: InputFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors appearance-none text-gray-900 h-[42px]"
        style={{ fontFamily: 'inherit' }}
        readOnly={readonly}
      />
    </div>
  );
}