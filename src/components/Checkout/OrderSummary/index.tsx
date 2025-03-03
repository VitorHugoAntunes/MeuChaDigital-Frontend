import SummaryItem from "../SummaryItem";

export default function OrderSummary() {
  return (
    <section>
      <h2 className="text-lg font-bold text-text-primary mb-4">Resumo do Pedido</h2>
      <div className="space-y-3 text-sm text-gray-700">
        <SummaryItem label="Subtotal:" value="R$ 250,00" />
        <SummaryItem label="Taxas:" value="R$ 10,00" />
        <SummaryItem label="Total:" value="R$ 260,00" isTotal />
      </div>
    </section>
  );
}