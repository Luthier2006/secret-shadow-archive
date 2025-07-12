import { Card, CardContent } from "@/components/ui/card";
import { 
  Lock, 
  Clock, 
  Shield, 
  Sparkles, 
  Key, 
  Database, 
  Eye, 
  Heart,
  Zap,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Criptografia Militar",
    description: "AES-256 bit com chaves únicas para cada segredo. Impossível de quebrar.",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "Cronômetro Preciso",
    description: "Controle exato de quando seus segredos serão liberados, até o minuto.",
    color: "text-secondary"
  },
  {
    icon: Sparkles,
    title: "IA Groq Integrada",
    description: "Análise poética e filosófica opcional dos seus segredos mais profundos.",
    color: "text-primary-glow"
  },
  {
    icon: Shield,
    title: "Zero Knowledge",
    description: "Nem mesmo nossos servidores podem acessar o conteúdo dos seus segredos.",
    color: "text-primary"
  },
  {
    icon: Key,
    title: "Múltiplas Chaves",
    description: "Sistema de chaves derivadas que garante segurança mesmo em caso de violação.",
    color: "text-secondary"
  },
  {
    icon: Database,
    title: "Backup Automático",
    description: "Seus segredos são replicados em múltiplos datacenters seguros.",
    color: "text-primary-glow"
  },
  {
    icon: Eye,
    title: "Visualização Rica",
    description: "Interface elegante para gerenciar e visualizar suas cápsulas do tempo.",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Memórias Eternas",
    description: "Preserve momentos importantes para o futuro com segurança total.",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Performance Extrema",
    description: "Carregamento instantâneo com infraestrutura global otimizada.",
    color: "text-primary-glow"
  },
  {
    icon: Globe,
    title: "Acesso Global",
    description: "Seus segredos disponíveis em qualquer lugar do mundo, 24/7.",
    color: "text-primary"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Tecnologia de{" "}
            <span className="glow-text">Vanguarda</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada recurso foi pensado para garantir máxima segurança e uma experiência única de preservação digital.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="surface-card group hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4 group-hover:glow-ring transition-all duration-300">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="surface-card p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para proteger seus segredos?
            </h3>
            <p className="text-muted-foreground mb-6">
              Junte-se a milhares de usuários que confiam no Archive para preservar suas memórias mais importantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-archive px-8 py-3 rounded-lg font-semibold">
                Começar Gratuitamente
              </button>
              <button className="surface-card px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};