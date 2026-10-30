import { ReactNode} from "react";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";

interface SharedMainLayoutProps {
  children: ReactNode;
}

export default function SharedMainLayout({ children }: SharedMainLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
          <Navbar />
      </header>

      <main className="mx-auto w-full max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}
