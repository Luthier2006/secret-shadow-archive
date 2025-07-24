import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Clock, Shield, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse opacity-40 animation-delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-primary-glow rounded-full animate-pulse opacity-30 animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="fade-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full surface-card text-sm font-medium mb-8 glow-ring">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Criptografia de Ponta a Ponta
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Enterre seus{" "}
            <span className="glow-text">segredos</span>{" "}
            no tempo
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Crie cápsulas do tempo digitais criptografadas. Seus segredos ficam protegidos até a data que você escolher, com análise opcional da IA.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="archive" 
              size="xl" 
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => navigate('/register')}
            >
              <Lock className="w-5 h-5 mr-2" />
              Criar Primeira Cápsula
            </Button>
            <Button 
              variant="surface" 
              size="xl" 
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Clock className="w-5 h-5 mr-2" />
              Saber Mais
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="surface-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Privado</h3>
              <p className="text-muted-foreground text-sm">
                Criptografia AES-256 garante que apenas você pode acessar seus segredos
              </p>
            </div>

            <div className="surface-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Programado</h3>
              <p className="text-muted-foreground text-sm">
                Defina exatamente quando seus segredos devem ser revelados
              </p>
            </div>

            <div className="surface-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">IA Inteligente</h3>
              <p className="text-muted-foreground text-sm">
                Análise poética opcional dos seus segredos com Groq AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};