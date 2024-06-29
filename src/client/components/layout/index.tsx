"use server";
import { getServerSession } from "next-auth";
import Footer from "./Footer";
import { Navigation } from "./Navigation";
import { Header } from "./header";
import { TopHeader } from "./topHeader";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <div>
      <TopHeader />
      <Header session={session} />
      <Navigation />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
