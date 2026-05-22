import { Outlet } from "react-router-dom";
import { VercelAnalytics } from "../analytics/VercelAnalytics";
import { CookieConsentProvider } from "../../context/CookieConsentContext";
import { LogoMorphProvider } from "../../context/LogoMorphContext";
import { CookieConsent } from "./CookieConsent";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <LogoMorphProvider>
      <CookieConsentProvider>
        <ScrollToTop />
        <VercelAnalytics />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CookieConsent />
      </CookieConsentProvider>
    </LogoMorphProvider>
  );
}
