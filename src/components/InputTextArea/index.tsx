type InputTextAreaProps = {
  label: string;
  placeholder?: string;
};

export default function InputTextArea({ label, placeholder }: InputTextAreaProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  )
}