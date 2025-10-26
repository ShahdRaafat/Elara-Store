import { redirect } from "next/navigation";
import { getCurrentUser } from "../_lib/data-services";
import { getUserInfo, getUserOrders } from "../_lib/actions";
import UserInfoForm from "../components/account/UserInfoForm";
import OrdersList from "../components/account/OrdersList";
import { User } from "lucide-react";

async function page() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [userInfo, orders] = await Promise.all([
    getUserInfo(),
    getUserOrders(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8 lg:space-y-10">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              My Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
              Manage your profile and view your order history
            </p>
          </div>
        </div>
      </div>
      <UserInfoForm user={userInfo} />
      <OrdersList orders={orders} />
    </div>
  );
}
export default page;
