import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  Server, 
  Fingerprint,
  CheckCircle2 
} from "lucide-react";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Criptografia AES-256",
    description: "Padrão militar usado por bancos e governos. Teoricamente impossível de quebrar.",
    technical: "256-bit Advanced Encryption Standard"
  },
  {
    icon: Key,
    title: "Chaves Derivadas",
    description: "Cada segredo possui chave única gerada através de PBKDF2 com salt aleatório.",
    technical: "PBKDF2-SHA256 com 100.000 iterações"
  },
  {
    icon: Eye,
    title: "Zero Knowledge",
    description: "Nem nossa equipe nem nossos servidores podem acessar seus dados descriptografados.",
    technical: "Client-side encryption/decryption"
  },
  {
    icon: Server,
    title: "Infraestrutura Segura",
    description: "Hospedagem em datacenters certificados SOC 2 com backup automático.",
    technical: "Multi-region redundancy"
  },
  {
    icon: Fingerprint,
    title: "Autenticação Forte",
    description: "Login seguro com Google OAuth 2.0 e autenticação de dois fatores.",
    technical: "Firebase Authentication + 2FA"
  },
  {
    icon: Lock,
    title: "HTTPS Sempre",
    description: "Todas as comunicações protegidas por TLS 1.3 com certificados válidos.",
    technical: "TLS 1.3 + Certificate Pinning"
  }
];

const certifications = [
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR Compliant", 
  "CCPA Compliant",
  "HIPAA Ready",
  "PCI DSS Level 1"
];

export const Security = () => {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full surface-card text-sm font-medium mb-6 glow-ring">
            <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
            Segurança Militar
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Seus segredos estão{" "}
            <span className="glow-text">blindados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utilizamos os mesmos padrões de segurança de bancos centrais e agências de inteligência para proteger seus dados.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="surface-card group hover:glow-ring transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-surface text-xs font-mono text-primary-glow">
                      {feature.technical}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="surface-card p-8 rounded-3xl mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Certificações & Compliance</h3>
            <p className="text-muted-foreground">
              Auditados e certificados pelos principais órgãos de segurança mundial
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-surface rounded-xl">
                <div className="text-center">
                  <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Promise */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto surface-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Nossa Promessa de Segurança</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Se algum dado for comprometido por falha nossa, oferecemos compensação de até $10.000 por usuário afetado. 
              Nosso código de segurança é auditado trimestralmente por empresas especializadas independentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="archive" size="lg">
                Ver Relatório de Auditoria
              </Button>
              <Button variant="surface" size="lg">
                Programa Bug Bounty
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};