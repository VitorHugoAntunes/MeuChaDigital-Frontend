interface TagProps {
  label: string;
  color: string;
}

export default function Tag({ label, color }: TagProps) {
  return (
    <span
      className={`text-xs font-semibold px-4 py-1 rounded-full ${color} first-letter:uppercase`}
      role="tag"
      aria-label={`Categoria: ${label}`}
      title={label}
    >
      {label.toUpperCase()}
    </span>
  )
}