import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

function page() {
  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <CheckoutForm />
      <CheckoutSummary />
    </div>
  );
}

export default page;
