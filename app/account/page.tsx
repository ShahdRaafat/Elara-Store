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
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Account
            </h1>
            <p className="text-gray-600 mt-1">
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
