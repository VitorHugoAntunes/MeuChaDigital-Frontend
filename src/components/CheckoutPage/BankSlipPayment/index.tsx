interface BankSlipPaymentProps {
  total: number;
}

export default function BankSlipPayment({ total }: BankSlipPaymentProps) {
  console.log(total);
  return (
    <div className="text-center">
      <h2 className="text-lg font-bold text-text-primary">Boleto Bancário</h2>
      <p className="text-sm text-gray-500 mt-2">
        Esta opção de pagamento será disponibilizada em breve.
      </p>
    </div>
  );
}