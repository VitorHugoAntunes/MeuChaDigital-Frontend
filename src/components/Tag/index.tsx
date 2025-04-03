enum TagColors {
  // Cores para categorias
  SPORTS = "bg-blue-200 text-blue-800",
  BABY = "bg-pink-200 text-pink-800",
  APPLIANCES = "bg-gray-200 text-gray-800",
  TOOLS = "bg-amber-200 text-amber-800",
  KITCHEN = "bg-orange-200 text-orange-800",
  ELECTRONICS = "bg-indigo-200 text-indigo-800",
  FASHION = "bg-purple-200 text-purple-800",
  DECOR = "bg-teal-200 text-teal-800",
  BEDDING = "bg-cyan-200 text-cyan-800",
  BOOKS = "bg-emerald-200 text-emerald-800",
  BEAUTY = "bg-fuchsia-200 text-fuchsia-800",

  // Cores para prioridades
  PRIORITY_LOW = "bg-green-200 text-green-800",
  PRIORITY_MEDIUM = "bg-yellow-200 text-yellow-800",
  PRIORITY_HIGH = "bg-red-200 text-red-800",

  // Cor padrão
  DEFAULT = "bg-gray-dark text-gray-900"
}

interface TagProps {
  label: string;
  color?: keyof typeof TagColors | string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

export default function Tag({ label, color, priority }: TagProps) {
  if (priority) {
    const priorityColor = `PRIORITY_${priority}` as keyof typeof TagColors;
    color = TagColors[priorityColor];
  }

  else if (!color) {
    color = getColorForCategory(label);
  }

  else if (color in TagColors) {
    color = TagColors[color as keyof typeof TagColors];
  }

  return (
    <span
      className={`text-xs font-semibold px-4 py-1 rounded-full ${color} first-letter:uppercase`}
      role="tag"
      aria-label={priority ? `Prioridade: ${label}` : `Categoria: ${label}`}
      title={label}
    >
      {label.toUpperCase()}
    </span>
  );
}

function getColorForCategory(category: string): string {
  switch (category.toLowerCase()) {
    case 'esportes e aventura': return TagColors.SPORTS;
    case 'brinquedos e bebê': return TagColors.BABY;
    case 'eletrodomésticos': return TagColors.APPLIANCES;
    case 'ferramentas': return TagColors.TOOLS;
    case 'cozinha': return TagColors.KITCHEN;
    case 'eletrônicos': return TagColors.ELECTRONICS;
    case 'moda e acessórios': return TagColors.FASHION;
    case 'decoração': return TagColors.DECOR;
    case 'cama, mesa e banho': return TagColors.BEDDING;
    case 'livros e cultura': return TagColors.BOOKS;
    case 'beleza e cuidados pessoais': return TagColors.BEAUTY;
    default: return TagColors.DEFAULT;
  }
}