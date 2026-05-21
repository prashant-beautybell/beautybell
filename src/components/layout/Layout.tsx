import { Outlet } from "react-router-dom";
import { LogoMorphProvider } from "../../context/LogoMorphContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <LogoMorphProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LogoMorphProvider>
  );
}
