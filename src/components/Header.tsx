import { useState } from "react";
import { Menu, X, Archive as ArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import archiveLogo from "@/assets/archive-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={archiveLogo} alt="Archive" className="w-8 h-8" />
            <span className="text-xl font-bold glow-text">LOVABLE Archive</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
              Segurança
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => window.location.href = '/login'}
            >
              Entrar
            </Button>
            <Button 
              variant="archive" 
              size="lg"
              onClick={() => window.location.href = '/register'}
            >
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 mt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                Segurança
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary"
                  onClick={() => window.location.href = '/login'}
                >
                  Entrar
                </Button>
                <Button 
                  variant="archive" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = '/register'}
                >
                  Começar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};