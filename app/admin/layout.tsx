import type { ReactNode } from "react";
import SidebarNavigation from "../components/admin/SidebarNavigation";
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[17.5rem_1fr] min-h-full gap-0 lg:gap-12">
      <SidebarNavigation />
      <main className="overflow-auto">
        <div className="p-4 sm:p-6 lg:p-0 ">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
