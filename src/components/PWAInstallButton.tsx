import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, X, Share, Apple } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(userAgent);
    const androidDevice = /Android/.test(userAgent);
    
    setIsIOS(iosDevice);
    setIsAndroid(androidDevice);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    if (isStandalone || (iosDevice && isIOSStandalone)) {
      setIsInstalled(true);
      return;
    }

    // Show install banner for supported devices
    if (iosDevice || androidDevice) {
      setShowInstallBanner(true);
    }

    // Listen for beforeinstallprompt event (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (androidDevice) {
        setShowInstallBanner(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      console.log('PWA foi instalado');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowInstallBanner(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
  };

  const handleIOSInstall = () => {
    setShowIOSInstructions(true);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isInstalled || !showInstallBanner) {
    return null;
  }

  // Check if user previously dismissed
  if (localStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  // iOS Instructions Modal
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="mx-4 max-w-md bg-background border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Instalar no iOS</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={handleDismiss}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">1</div>
                <p>Toque no botão <Share className="inline h-4 w-4 mx-1" /> (Compartilhar) no Safari</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">2</div>
                <p>Selecione "Adicionar à Tela Inicial"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">3</div>
                <p>Toque em "Adicionar" para instalar o app</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Alert className="border-primary/20 bg-primary/10 backdrop-blur-md">
        <Smartphone className="h-4 w-4 text-primary" />
        <AlertDescription className="pr-8">
          <div className="mb-3">
            <p className="font-medium text-foreground">Instalar Archive</p>
            <p className="text-sm text-muted-foreground">
              Acesse rapidamente como um app nativo
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            {/* Android Install Button */}
            {isAndroid && deferredPrompt && (
              <Button
                size="sm"
                onClick={handleAndroidInstall}
                className="bg-primary hover:bg-primary/90 w-full"
              >
                <Download className="h-3 w-3 mr-2" />
                Instalar no Android
              </Button>
            )}
            
            {/* iOS Install Button */}
            {isIOS && (
              <Button
                size="sm"
                onClick={handleIOSInstall}
                className="bg-primary hover:bg-primary/90 w-full"
              >
                <Apple className="h-3 w-3 mr-2" />
                Instalar no iOS
              </Button>
            )}
            
            {/* Generic Install Button (fallback) */}
            {!isIOS && !isAndroid && (
              <Button
                size="sm"
                onClick={deferredPrompt ? handleAndroidInstall : handleIOSInstall}
                className="bg-primary hover:bg-primary/90 w-full"
              >
                <Download className="h-3 w-3 mr-2" />
                Instalar App
              </Button>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground w-full"
            >
              <X className="h-3 w-3 mr-2" />
              Dispensar
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};