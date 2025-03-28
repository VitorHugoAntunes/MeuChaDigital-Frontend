interface CreditCardPaymentProps {
  total: number;
}

export default function CreditCardPayment({ total }: CreditCardPaymentProps) {
  console.log(total);
  return (
    <div id="payment" className="text-center">
      <h2 className="text-lg font-bold text-text-primary">Pagamento com Cartão de Crédito</h2>
      <p className="text-sm text-gray-500 mt-2">
        Esta opção de pagamento será disponibilizada em breve.
      </p>
    </div>
  );
}