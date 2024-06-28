import Footer from "./Footer";
import { Navigation } from "./Navigation";
import { Header } from "./header";
import { TopHeader } from "./topHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopHeader />
      <Header />
      <Navigation />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
