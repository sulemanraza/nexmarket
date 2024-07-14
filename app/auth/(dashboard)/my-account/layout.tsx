import ProtectRoute from "@/client/utils/ProtectRoute";
import { NavigationBar } from "./NavigationBar";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <ProtectRoute>
      <div className="container py-10 space-y-10 min-h-screen h-full">
        <NavigationBar menus={menus}>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 uppercase font-medium text-sm">
              Welcome!{" "}
              <span className="text-brand ml-2">{session?.user.name}</span>
            </div>
          </div>
        </NavigationBar>
        <div>{children}</div>
      </div>
    </ProtectRoute>
  );
}

const menus = [
  { title: "My Profile", href: "/auth/my-account/profile" },
  { title: "Address", href: "/auth/my-account/address" },
  { title: "Orders", href: "/auth/my-account/order" },
  { title: "My Reviews", href: "/auth/my-account/reviews" },
  { title: "My Wishlist", href: "/auth/my-account/wishlist" },
];
