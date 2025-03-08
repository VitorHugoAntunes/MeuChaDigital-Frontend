export const GiftCardSkeleton = () => {
  return (
    <article className="w-full max-w-sm border border-gray-200 rounded-lg bg-white overflow-hidden shadow-md animate-pulse">
      {/* Imagem */}
      <div className="relative w-full h-40 bg-gray-300 rounded-t-lg"></div>

      {/* Conteúdo */}
      <section className="p-4 space-y-4">
        {/* Categoria e Preço */}
        <header className="flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </header>

        {/* Título */}
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

        {/* Descrição */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>

        {/* Prioridade e Ações */}
        <footer className="flex justify-between items-center">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="flex gap-4">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
        </footer>
      </section>
    </article>
  );
};

export default GiftCardSkeleton;