import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";

export const metadata = {
  title: "Cart",
};
function Page() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-5  lg:grid-cols-6 md:gap-4 lg:gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <CartList />
        <CartSummary />
      </div>
    </div>
  );
}

export default Page;
