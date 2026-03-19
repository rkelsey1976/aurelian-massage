import type { ReactNode } from "react";

import { DiscountModal } from "@/components/marketing/discount-modal";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-purple-dark">
      <Header />
      <main>{children}</main>
      <Footer />
      <DiscountModal />
    </div>
  );
}
