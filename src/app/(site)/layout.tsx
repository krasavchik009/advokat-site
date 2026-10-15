import { AskModalProvider } from "@/components/AskModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AskModalProvider>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </AskModalProvider>
  );
}
