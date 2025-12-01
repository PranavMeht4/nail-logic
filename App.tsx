import React from 'react';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Youtube, 
  Star, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { SocialButton } from './components/SocialButton';
import { NailDesignGenerator } from './components/NailDesignGenerator';
import { SocialLinkProps } from './types';

const WHATSAPP_NUMBER = '917016531812';

// Simplified colorClass usage - we are now relying on the component's internal refined styling
// keeping the prop for compatibility but it's largely overridden by the clean new UI
const socialLinks: SocialLinkProps[] = [
  {
    label: 'Book Appointment',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: Phone,
    colorClass: 'bg-stone-900', 
    description: 'Direct booking via WhatsApp'
  },
  {
    label: 'Portfolio',
    url: 'https://www.instagram.com/naillogic_?igsh=Z3QzYjdpMjZkZjF2&utm_source=qr',
    icon: Instagram,
    colorClass: 'bg-stone-900',
    description: 'Latest works on Instagram'
  },
  {
    label: 'Client Reviews',
    url: 'https://share.google/atYnn1ueXubRQMgyN',
    icon: Star,
    colorClass: 'bg-stone-900',
    description: 'Read 5-star experiences'
  },
  {
    label: 'Salon Location',
    url: 'https://maps.app.goo.gl/cuYYxd4jJe3t3JSw6?g_st=ipc',
    icon: MapPin,
    colorClass: 'bg-stone-900',
    description: 'Navigate to studio'
  },
  {
    label: 'Tutorials',
    url: 'https://youtube.com/@naillogic7171?si=Y5URwuhWRpIMt8MC',
    icon: Youtube,
    colorClass: 'bg-stone-900',
    description: 'Watch on YouTube'
  },
  {
    label: 'Write a Review',
    url: 'https://search.google.com/local/writereview?placeid=ChIJ3-d4949ZYzkRls9rK18u2TI',
    icon: MessageSquare,
    colorClass: 'bg-stone-900',
    description: 'Share your experience'
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Editorial Background Element - Subtle Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-rose-100/40 to-stone-100/40 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-stone-200/40 to-white rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12 md:py-16 flex flex-col items-center">
        
        {/* Editorial Header */}
        <header className="flex flex-col items-center mb-12 w-full animate-slide-up">
          <div className="mb-6 relative group cursor-default">
            <div className="absolute inset-0 bg-stone-200 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center overflow-hidden">
               <span className="font-serif font-bold text-3xl text-stone-900 italic">NL</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-stone-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-stone-400" />
            </div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 tracking-tight">
              Nail Logic
            </h1>
            <div className="flex items-center justify-center gap-3 text-stone-500 text-sm font-sans tracking-widest uppercase mt-3">
              <span className="h-px w-8 bg-stone-300"></span>
              <span>By Miral Mehta</span>
              <span className="h-px w-8 bg-stone-300"></span>
            </div>
          </div>
        </header>

        {/* Main Navigation Links */}
        <main className="w-full flex flex-col gap-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {socialLinks.map((link, index) => (
            <SocialButton key={index} {...link} />
          ))}
        </main>

        {/* Separator */}
        <div className="w-full py-8 flex justify-center opacity-30">
          <div className="w-1 h-8 border-l border-dashed border-stone-400"></div>
        </div>

        {/* AI Tool */}
        <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <NailDesignGenerator />
        </div>

        {/* Minimal Footer */}
        <footer className="mt-12 text-center text-stone-400 text-xs font-light tracking-wide uppercase">
          <p className="mb-2">© {new Date().getFullYear()} Nail Logic</p>
          <div className="flex items-center justify-center gap-1.5 opacity-50">
            <span>Mumbai</span>
            <span className="w-1 h-1 rounded-full bg-stone-400"></span>
            <span>India</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;