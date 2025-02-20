interface InputSelectProps {
  label: string;
  options: string[];
}

export default function InputSelect({ label, options }: InputSelectProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors bg-white h-[42px] font-inter">
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
    </div>
  );
}