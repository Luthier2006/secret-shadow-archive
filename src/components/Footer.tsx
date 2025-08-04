import { Heart, Github, Twitter, Mail } from "lucide-react";
import archiveLogo from "@/assets/archive-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={archiveLogo} alt="Archive" className="w-8 h-8" />
              <span className="text-xl font-bold glow-text">LOVABLE Archive</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A plataforma mais segura para preservar seus segredos mais importantes no tempo. 
              Criptografia militar, IA inteligente e design elegante.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Bug Reports</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 - Archive. Todos os direitos reservados. Desenvolvido por: <a href="https://www.instagram.com/levi_oliveira86" className="text-primary hover:text-primary-glow transition-colors" target="_blank" rel="noopener noreferrer">Ytallo Gabriel </a>
            e <a href="https://www.instagram.com" className="text-primary hover:text-primary-glow transition-colors" target="_blank" rel="noopener noreferrer">Leandro Luiz</a>.
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Feito com</span>
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span>para proteger seus segredos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
