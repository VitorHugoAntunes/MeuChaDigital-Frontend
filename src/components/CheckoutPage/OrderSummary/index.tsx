import { useSearchParams } from "next/navigation";
import SummaryItem from "../SummaryItem";
import { formatCurrency } from "@/utils/formatCurrency";

export default function OrderSummary() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 0;

  const feePercentage = 0.05;
  let fee = amount * feePercentage;

  if (fee < 0.02) {
    fee = 0.02;
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-text-primary mb-4">Resumo do Pedido</h2>
      <div className="space-y-3 text-sm text-gray-700">
        <SummaryItem label="Subtotal:" value={formatCurrency(amount)} />
        <SummaryItem label="Taxas:" value={formatCurrency(fee)} />
        <SummaryItem label="Total:" value={formatCurrency(amount + fee)} isTotal />
      </div>
    </section>
  );
}
