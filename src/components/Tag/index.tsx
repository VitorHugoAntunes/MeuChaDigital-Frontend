interface TagProps {
  label: string;
  color: string;
}

export default function Tag({ label, color }: TagProps) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}
      role="tag"
      aria-label={`Categoria: ${label}`}
    >
      {label}
    </span>
  )
}