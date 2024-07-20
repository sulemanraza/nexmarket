import Layout from "@/client/components/layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProtectRoute = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/auth/login");
  }
  return <Layout>{children}</Layout>;
};

export default ProtectRoute;
