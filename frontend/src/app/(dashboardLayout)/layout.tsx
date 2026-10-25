import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";

// Dashboard uses auth/cookies, so we must avoid static prerendering during `next build`.
export const dynamic = "force-dynamic";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
