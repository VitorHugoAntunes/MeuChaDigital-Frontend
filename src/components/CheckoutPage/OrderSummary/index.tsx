import SummaryItem from "../SummaryItem";
import { formatCurrency } from "@/utils/formatString";

interface OrderSummaryProps {
  amount: number;
  fee: number;
  total: number;
}

export default function OrderSummary({ amount, fee, total }: OrderSummaryProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-text-primary mb-4">Resumo do Pedido</h2>
      <div className="space-y-3 text-sm text-gray-700">
        <SummaryItem label="Subtotal:" value={formatCurrency(amount)} />
        <SummaryItem label="Taxas:" value={formatCurrency(fee)} />
        <SummaryItem label="Total:" value={formatCurrency(total)} isTotal />
      </div>
    </section>
  );
}