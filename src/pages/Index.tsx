import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Security } from "@/components/Security";
import { Footer } from "@/components/Footer";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { PWAInstallButton } from "@/components/PWAInstallButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-4">
          <ConnectionStatus />
        </div>
        <Hero />
        <Features />
        <Security />
      </main>
      <Footer />
      <PWAInstallButton />
    </div>
  );
};

export default Index;
